import dotenv from 'dotenv'
import express, { Response } from 'express';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import plaid from 'plaid';
import mongoose from 'mongoose';

import './db/models/index';

dotenv.config();

const User = mongoose.model('User');
const plaidRouter = express.Router({});

// Initialize the Plaid client
const client = new plaid.Client({
	clientID: process.env.PLAID_CLIENT_ID,
	secret: process.env.PLAID_SECRET,
	env: plaid.environments[process.env.PLAID_ENV],
	options: { }
	// process.env.PLAID_PUBLIC_KEY,
});

plaidRouter.use(
	bodyParser.urlencoded({
		extended: false
	})
);

plaidRouter.use(bodyParser.json());

// Send back the public key and the environment to plaid
plaidRouter.get('/key-and-env', (_req, res) => {
	res.send({
		publicKey: process.env.PLAID_PUBLIC_KEY.toString(),
		env: process.env.PLAID_ENV.toString()
	});
});

plaidRouter.post('/rotate-access-tokens', async (req, res) => {
	const accessTokens = req.session.user.accessTokens;
	const itemID = req.session.user.itemID;
	if (accessTokens.length === 0 || itemID.length === 0) return;

	// Rotate access tokens
	const newAccessTokens = [];

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

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	req.session.save(() => {});

	// Update access tokens on the server
	User.updateOne(
		{ _id: req.session.user._id },
		{ $set: { accessTokens: newAccessTokens } }
	);
});

// Get Access Tokens and Item IDs from Plaid
plaidRouter.post('/get-access-token', async (req, res) => {
	const PUBLIC_TOKEN = req.body.public_token;
	console.log(`public token: ${PUBLIC_TOKEN}`);

	try {
		// Get the token response
		const tokenResponse = await client.exchangePublicToken(PUBLIC_TOKEN);

		const currAccessTokens = req.session.user.accessTokens;
		currAccessTokens.push(tokenResponse.access_token);

		const currItemID = req.session.user.itemID;
		currItemID.push(tokenResponse.item_id);

		// Update the session with the new account info
		req.session.user.accessTokens = currAccessTokens;
		req.session.user.itemID = currItemID;

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		req.session.save(() => {});

		// Update the db with the new account info
		User.updateOne(
			{ _id: req.session.user._id },
			{ $set: { accessTokens: currAccessTokens, itemID: currItemID } }
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
plaidRouter.get('/transactions', async (req, res) => {

	const startDate = req.query.startDate as string;
	const endDate = req.query.endDate as string;

	try {

		const accessTokens = req.session.user.accessTokens;
		const totalData = await resolvePlaidTransactions(accessTokens, startDate, endDate);

		if (totalData instanceof Error) {
			const badAccessToken = totalData.message.split(':')[1].trim();

			console.log(chalk.blue('-----------------------------------------'));
			console.log('TRANSACTIONS We got an error!!!');
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

plaidRouter.get('/balance', async (req, res) => {

	const bankData = await resolvePlaidBalance(req.session.user.accessTokens, res);

	const data = createData(bankData);

	const { totalSavings, arrayOfObjects } = data;

	res.send({
		arrayOfObjects,
		totalSavings
	});

});

function createData(data: plaid.AccountsResponse[]) {

	let totalSavings = 0;

	const allInstitutionInformation = data.map(institutionPromise => {

		const institution = institutionPromise;
		const institutionId = institution.item.institution_id;
		const accountsArray = institution.accounts;

		const info = collateInstitutionInfo(accountsArray);

		const { institutionBalance, institutionBalanceObject } = info;

		totalSavings += institutionBalance;

		const institutionInformation = {
			institutionId,
			institutionBalance,
			institutionBalanceObject
		};

		return institutionInformation;

	});

	return {
		arrayOfObjects: allInstitutionInformation,
		totalSavings
	};

}

function collateInstitutionInfo(accounts: plaid.Account[]) {

	const institutionBalanceObject = accounts.reduce(
		(accumulator, account) => {

			const {
				account_id,
				type,
				name,
				balances: {
					current: accountBalance
				}
			} = account;

			if (accountBalance !== null) {

				accumulator[account_id] = {
					accountType: type,
					accountBalance,
					accountName: name
				}
			}

			return accumulator;

		},
		{} as Record<string, { accountType: string; accountBalance: number; accountName: string; }>
	);

	const institutionBalance = accounts.reduce(
		(accumulator, account) => {

			const {
				type,
				balances: {
					current: accountBalance
				}
			} = account;

			if (accountBalance !== null) {

				if (type === 'credit') {
					accumulator -= accountBalance;
				} else {
					accumulator += accountBalance;
				}
			}

			return accumulator;

		},
		0
	);

	return {
		institutionBalance,
		institutionBalanceObject
	};
}

async function resolvePlaidBalance(accessTokensArray: string[], res: Response) {


	const promises = accessTokensArray.map((accessToken) => {

		try {

			return client.getBalance(accessToken);

		} catch(error) {

			console.log('--------------' + error);

			return {} as plaid.AccountsResponse;

		}

	});

	try {

		return await Promise.all(promises)

	} catch(error) {

		console.log('We got a bad one...');

		console.log(error);
		const badAccessToken = error.message.split(':')[1].trim();

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

			console.log('----------------------------');
			console.log(chalk.red('Error from /balance'));
			console.log(err);
			console.log('----------------------------');

		});

	}

}

plaidRouter.get('/linked-accounts', async (req, res) => {

	try {

		const banks = {};

		// Get Item ID for each access token
		const itemInfo = req.session.user.accessTokens.map(
			(token: string): Promise<plaid.ItemResponse> => client.getItem(token)
		);

		const itemData = await Promise.all(itemInfo); // Wait for all the promises to resolve

		// Get the associated instituion for the given Item ID
		const ids = itemData.map((thing: { item: { institution_id: string } }) =>
			client.getInstitutionById(thing.item.institution_id, ['US'])
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
		await User.updateOne(
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
	const allData = [];
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
