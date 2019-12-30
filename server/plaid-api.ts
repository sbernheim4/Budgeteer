require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import plaid from 'plaid';
import mongoose from 'mongoose';

import './db/models/index';

const User = mongoose.model('User');
const plaidRouter = express.Router({});

// Initialize the Plaid client
let client = new plaid.Client(
	process.env.PLAID_CLIENT_ID,
	process.env.PLAID_SECRET,
	process.env.PLAID_PUBLIC_KEY,
	plaid.environments[process.env.PLAID_ENV]
);

plaidRouter.use(
	bodyParser.urlencoded({
		extended: false
	})
);

plaidRouter.use(bodyParser.json());

// Send back the public key and the environment to plaid
plaidRouter.get('/key-and-env', (_req: Request, res: Response) => {
	res.send({
		publicKey: process.env.PLAID_PUBLIC_KEY.toString(),
		env: process.env.PLAID_ENV.toString()
	});
});

plaidRouter.post('/rotate-access-tokens', async (req: Request, res: Response) => {
	const accessTokens = req.session.user.accessTokens;
	const itemID = req.session.user.itemID;
	if (accessTokens.length === 0 || itemID.length === 0) return;

	// Rotate access tokens
	let newAccessTokens = [];

	for (const token of accessTokens) {
		try {
			const result = await client.invalidateAccessToken(token);

			newAccessTokens.push(result.new_access_token);
		} catch (err) {
			console.error(err);

			res.json({
				result: err
			});
		}
	}

	// Update access tokens on the session
	req.session.user.accessTokens = newAccessTokens;
	req.session.save(() => {});

	// Update access tokens on the server
	User.update({ _id: req.session.user._id }, { $set: { accessTokens: newAccessTokens } }, () => {
		console.log(chalk.green('Access Tokens have rotated'));
		res.json({
			result: 'New tokens were successfully generated. Please refresh the page to continue.'
		});
	});
});

// Get Access Tokens and Item IDs from Plaid
plaidRouter.post('/get-access-token', async (req: Request, res: Response) => {
	const PUBLIC_TOKEN = req.body.public_token;
	console.log(`public token: ${PUBLIC_TOKEN}`);

	try {
		// Get the token response
		let tokenResponse = await client.exchangePublicToken(PUBLIC_TOKEN);

		let currAccessTokens = req.session.user.accessTokens;
		currAccessTokens.push(tokenResponse.access_token);

		let currItemID = req.session.user.itemID;
		currItemID.push(tokenResponse.item_id);

		// Update the session with the new account info
		req.session.user.accessTokens = currAccessTokens;
		req.session.user.itemID = currItemID;
		req.session.save(() => {});

		// Update the db with the new account info
		User.update(
			{ _id: req.session.user._id },
			{ $set: { accessTokens: currAccessTokens, itemID: currItemID } },
			() => {
				console.log(chalk.green('New account has been saved'));
			}
		);

		res.status(204).end();
	} catch (err) {
		console.log(err);

		return res.json({
			error: err
		});
	}
});

// Get Transaction information
plaidRouter.get('/transactions', async (req: Request, res) => {

	const startDate = req.query.startDate;
	const endDate = req.query.endDate;

	try {

		const accessTokens = req.session.user.accessTokens;
		const totalData = await resolvePlaidTransactions(accessTokens, startDate, endDate);

		if (totalData instanceof Error) {
			console.log(chalk.blue('-----------------------------------------'));
			console.log('TRANSACTIONS We got an error!!!');
			const badAccessToken = totalData.message.split(':')[1].trim();
			console.log('badAccessToken:', badAccessToken);

			client.createPublicToken(badAccessToken, (err, result) => {
				if (err) {
					console.log('TRANSACTION: Error in making new public token...');
					console.log(err);
				} else {
					console.log('TRANSACTION: Public token made succssfully. Is:\n', result);

					return res.json({
						Error: 'TRANSACTION Reauthentication required',
						publicToken: result.public_token
					});
				}
			});
			console.log(chalk.blue('-----------------------------------------'));
		} else {
			res.json(totalData);
		}
	} catch (err) {
		console.log(chalk.red('--------------------------------------'));
		console.log('ERROR in /transactions');
		console.log(err);
		console.log(chalk.red('--------------------------------------'));
	}
});

plaidRouter.get('/balance', async (req: Request, res) => {
	let bankData;

	try {

		bankData = await resolvePlaidBalance(req.session.user.accessTokens);

		if (bankData instanceof Error) {
			console.log('We got a bad one...');
			const badAccessToken = bankData.message.split(':')[1].trim();

			client.createPublicToken(badAccessToken, (err, result) => {
				if (err) {
					console.log('Error in making new public token...');
					console.log(err);
				} else {
					console.log('Public token made succssfully. Is:\n', result);

					return res.json({
						Error: 'BALANCE: Reauthentication Required',
						publicToken: result.public_token
					});
				}
			});

		} else {

			const data = createData(bankData);
			const { totalSavings, arrayOfObjects } = data;

			res.send({
				arrayOfObjects,
				totalSavings
			});
		}

	} catch (err) {
		console.log('----------------------------');
		console.log(chalk.red('Error from /balance'));
		console.log(err);
		console.log('----------------------------');
	}
});

function createData(data) {

	let arrayOfObjects = [];
	let totalSavings = 0;

	data.forEach(institution => {

		const institutionId = institution.item.institution_id;
		const accountsArray = institution.accounts;

		const info = collateInstitutionInfo(accountsArray);
		const { institutionBalance, institutionBalanceObject } = info;

		totalSavings += institutionBalance;

		const institutionInfo = {
			institutionId,
			institutionBalance,
			institutionBalanceObject
		}

		arrayOfObjects.push(institutionInfo);

	});

	return {
		arrayOfObjects,
		totalSavings
	};
}

function collateInstitutionInfo(arrayOfAccounts) {
	let institutionBalance = 0;
	let institutionBalanceObject = {};

	arrayOfAccounts.forEach((account) => {
		const accountId = account.account_id;
		const accountType = account.type;
		const accountBalance = account.balances.current;
		const accountName = account.name;

		if (accountBalance !== null) {

			if (accountType === 'credit') {
				institutionBalance -= accountBalance;
			} else {
				institutionBalance += accountBalance;
			}

			institutionBalanceObject[accountId] = {
				accountType,
				accountBalance,
				accountName
			};
		}
	});

	return {
		institutionBalance,
		institutionBalanceObject
	};
}

async function resolvePlaidBalance(accessTokensArray: string[]) {
	let allData = [];
	for (let i = 0; i < accessTokensArray.length; i++) {
		try {
			const newData = await client.getBalance(accessTokensArray[i]);
			allData.push(newData);
		} catch (err) {
			return new Error('BALANCE Error with token: ' + accessTokensArray[i]);
		}
	}
	return allData;
}

plaidRouter.get('/linked-accounts', async (req, res) => {

	try {

		let banks = {};

		// Get Item ID for each access token
		const itemInfo = req.session.user.accessTokens.map(
			(token: string): Promise<plaid.ItemResponse> => client.getItem(token)
		);

		let itemData = await Promise.all(itemInfo); // Wait for all the promises to resolve

		// Get the associated instituion for the given Item ID
		const ids = itemData.map((thing: { item: { institution_id: string } }) =>
			client.getInstitutionById(thing.item.institution_id)
		);

		const data = await Promise.all(ids); // Wait for all the IDs to be processed

		// Collate all the institutions into one array
		data.forEach((place) => {
			banks[place.institution.institution_id] = place.institution.name;
		});

		// Send back the array to the client
		res.json({
			banks
		});

	} catch (err) {

		console.error(err);

	}

});

plaidRouter.post('/remove-account', async (req, res) => {
	// Index in the arrays that should be removed
	const i = req.body.data.bankIndex;

	// Remove the access token and item id for the corresponding bank
	const copyOfAccessTokens = req.session.user.accessTokens;
	const copyOfItemIDs = req.session.user.itemID;

	const newAccessTokens = [...copyOfAccessTokens.slice(0, i), ...copyOfAccessTokens.slice(i + 1)];
	const newItemIDs = [...copyOfItemIDs.slice(0, i), ...copyOfItemIDs.slice(i + 1)];

	req.session.user.accessTokens = newAccessTokens;
	req.session.user.itemID = newItemIDs;

	try {
		// Update the values in the database
		await User.update(
			{ _id: req.session.user._id },
			{
				$set: {
					accessTokens: newAccessTokens,
					itemID: newItemIDs
				}
			}
		);
	} catch (err) {
		res.status(500).json({
			ERROR: 'An error has occurred, please refresh the page and try again in a few minutes'
		});
	}

	res.json({
		status: req.body.data.bankName
	});
});

async function resolvePlaidTransactions(accessTokensArray: string[], startDate: string, endDate: string) {
	let allData = [];
	for (let i = 0; i < accessTokensArray.length; i++) {
		try {
			const newData = await client.getTransactions(accessTokensArray[i], startDate, endDate, {
				count: 250,
				offset: 0
			});
			allData.push(newData);
		} catch (err) {
			console.log(err);
			return new Error('TRANSACTION Error with token: ' + accessTokensArray[i]);
		}
	}

	return allData;
}

export default plaidRouter;
