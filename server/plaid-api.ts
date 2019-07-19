/* eslint no-undefined: off */

require('dotenv').config();

import express, { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import moment from 'moment';
import plaid from 'plaid';
import mongoose from 'mongoose';

import './db/models/index';

const User = mongoose.model('User');
const plaidApiRouter = express.Router({});

// Initialize the Plaid client
let client = new plaid.Client(
	process.env.PLAID_CLIENT_ID,
	process.env.PLAID_SECRET,
	process.env.PLAID_PUBLIC_KEY,
	plaid.environments[process.env.PLAID_ENV]
);

plaidApiRouter.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

plaidApiRouter.use(bodyParser.json());

// Log All Requests
plaidApiRouter.all('*', (req: Request, _res: Response, next: NextFunction) => {
	console.log(chalk.yellow(`--PLAID-API-- ${req.method} request for ${req.path}`));
	next();
});

// Send back the public key and the environment to plaid
plaidApiRouter.get('/key-and-env', (_req: any, res: { send: (arg0: { publicKey: string; env: string }) => void }) => {
	res.send({
		publicKey: process.env.PLAID_PUBLIC_KEY.toString(),
		env: process.env.PLAID_ENV.toString(),
	});
});

plaidApiRouter.post('/rotate-access-tokens', async (req, res) => {
	if (req.session.user.accessTokens.length === 0 || req.session.user.itemID.length === 0) return;

	// Rotate access tokens
	let newAccessTokens = [];

	for (const token of req.session.user.accessTokens) {
		try {
			const result = await client.invalidateAccessToken(token);

			newAccessTokens.push(result.new_access_token);
		} catch (err) {
			console.error(err);

			res.json({
				result: err,
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
			result: 'New tokens were successfully generated. Please refresh the page to continue.',
		});
	});
});

// Get Access Tokens and Item IDs from Plaid
plaidApiRouter.post('/get-access-token', async (req, res) => {
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
			error: err,
		});
	}
});

// Get Transaction information
plaidApiRouter.get('/transactions', async (req, res) => {
	// Default to past 30 days if no specific date is specified
	const days = req.body.days === undefined ? 30 : req.body.days;

	// Use passed in start and end dates, otherwise default to the last `days` number of days
	let startDate = req.body.startDate
		? moment(new Date(req.body.startDate)).format('YYYY-MM-DD')
		: moment()
				.subtract(days, 'days')
				.format('YYYY-MM-DD');
	let endDate = req.body.endDate
		? moment(new Date(req.body.endDate)).format('YYYY-MM-DD')
		: moment().format('YYYY-MM-DD');

	try {
		// let totalData = await Promise.all(promiseArray);
		let totalData = await resolvePlaidTransactions(req.session.user.accessTokens, startDate, endDate);
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
						publicToken: result.public_token,
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

async function resolvePlaidTransactions(accessTokensArray: string[], startDate: string, endDate: string) {
	let allData = [];
	for (let i = 0; i < accessTokensArray.length; i++) {
		try {
			const newData = await client.getTransactions(accessTokensArray[i], startDate, endDate, {
				count: 250,
				offset: 0,
			});
			allData.push(newData);
		} catch (err) {
			console.log(err);
			return new Error('TRANSACTION Error with token: ' + accessTokensArray[i]);
		}
	}

	return allData;
}

interface networkMap {
	[key: string]: Number | string;
}

plaidApiRouter.get('/balance', async (req, res) => {
	let allData;

	try {
		allData = await resolvePlaidBalance(req.session.user.accessTokens);

		if (allData instanceof Error) {
			console.log('We got a bad one...');
			const badAccessToken = allData.message.split(':')[1].trim();

			client.createPublicToken(badAccessToken, (err, result) => {
				if (err) {
					console.log('Error in making new public token...');
					console.log(err);
				} else {
					console.log('Public token made succssfully. Is:\n', result);

					return res.json({
						Error: 'BALANCE: Reauthentication Required',
						publicToken: result.public_token,
					});
				}
			});
		} else {
			let banks: any[] | { bankTotal: number; map: {} }[] = [];

			allData.forEach((bank, index) => {
				let bankTotal = 0;
				let networth: networkMap = {};

				bank.accounts.forEach((acct) => {
					const id = acct.account_id;

					if (acct.balances.current !== null && acct.type !== 'credit') {
						const value = acct.balances.current;
						bankTotal += value;
						networth[id] = value;
					} else if (acct.type !== 'credit') {
						networth[id] = 'N/A';
					}
				});

				banks[index] = {
					bankTotal: bankTotal,
					map: networth,
				};
			});

			let networth = 0;
			let arrayOfMaps: any[] = [];
			banks.forEach((bank, index) => {
				networth += bank.bankTotal;
				arrayOfMaps[index] = bank.map;
			});

			res.json({
				networth: networth,
				maps: arrayOfMaps,
			});
		}
	} catch (err) {
		console.log('----------------------------');
		console.log(chalk.red('Error from /balance'));
		console.log(err);
		console.log('----------------------------');
	}
});

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

plaidApiRouter.get('/linked-accounts', async (req, res) => {
	try {
		let banks: string[] = [];

		const itemInfo = req.session.user.accessTokens.map(
			(token: string): Promise<plaid.ItemResponse> => client.getItem(token)
		); // Get Item ID for each access token
		let itemData = await Promise.all(itemInfo); // Wait for all the promises to resolve
		const ids = itemData.map((thing: { item: { institution_id: string } }) =>
			client.getInstitutionById(thing.item.institution_id)
		); // Get the associated instituion for the given Item ID
		let data = await Promise.all(ids); // Wait for all the IDs to be processed
		data.forEach((place) => banks.push(place.institution.name)); // Collate all the institutions into one array

		// Send back the array to the client
		res.json({
			accounts: banks,
		});
	} catch (err) {
		console.error(err);
	}
});

plaidApiRouter.post('/remove-account', async (req, res) => {
	// Index in the arrays that should be removed
	const i = req.body.data.bankIndex;

	// Remove the access token and item id for the corresponding bank
	const copyOfAccessTokens = req.session.user.accessTokens;
	const copyOfItemIDs = req.session.user.itemID;

	const newAccessTokens = [...copyOfAccessTokens.slice(0, i), ...copyOfAccessTokens.slice(i + 1)];
	const newItemIDs = [...copyOfItemIDs.slice(0, i), ...copyOfItemIDs.slice(i + 1)];

	try {
		// Update the values in the database
		await User.update(
			{ _id: req.session.user._id },
			{
				$set: {
					accessTokens: newAccessTokens,
					itemID: newItemIDs,
				},
			}
		);

		req.session.user.accessTokens = newAccessTokens;
		req.session.user.itemID = newItemIDs;
		console.log(chalk.green('Bank Removed'));

		res.json({
			status: req.body.data.bankName,
		});
	} catch (err) {
		res.status(500).json({
			ERROR: 'An error has occurred, please refresh the page and try again in a few minutes',
		});
	}
});

export default plaidApiRouter;
