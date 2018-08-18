/* eslint no-undefined: off */

const express = require("express");
const Router = express.Router();
const path = require("path");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const moment = require("moment");
const plaid = require("plaid");
const mongoose = require('mongoose');
const User = mongoose.model('User');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV

let PUBLIC_TOKEN = null;

// Initialize the Plaid client
let client = new plaid.Client(
	PLAID_CLIENT_ID,
	PLAID_SECRET,
	PLAID_PUBLIC_KEY,
	plaid.environments[PLAID_ENV]
);

Router.use(bodyParser.urlencoded({
	extended: false
}));

Router.use(bodyParser.json());

// Log All Requests
// Router.all("*", (req, res, next) => {
// 	console.log(chalk.yellow(`--PLAID-API-- ${req.method} request for ${req.path}`));
// 	next();
// });

// Send back the public key and the environment to plaid
Router.get("/key-and-env", (req, res) => {
	const jsonResponse = {
		"publicKey": PLAID_PUBLIC_KEY.toString(),
		"env": PLAID_ENV.toString()
	}

	res.send(jsonResponse);
});

Router.post("/rotate-access-tokens", async (req, res) => {

	if (req.session.user.accessTokens.length === 0 || req.session.user.itemID.length === 0) return;

	// Rotate access tokens
	let newAccessTokens = [];
	for (let token of req.session.user.accessTokens) {

		try {
			const result = await client.invalidateAccessToken(token);
			newAccessTokens.push(result.new_access_token);
		} catch(err) {
			console.error(err);

			res.json({
				"result": err
			});
		}
	}

	// Update access tokens on the server
	User.update({ _id: req.session.user._id }, { $set: { accessTokens: newAccessTokens } }, () => {
		console.log(chalk.green("Access Tokens have rotated"));
		res.json({
			"result": "New tokens were successfully generated. Please refresh the page to continue."
		});
	});
});

/*Router.post('/set-stored-access-token', async (req, res, next) => {

	let data;

	try {
		// TODO: Generalize this for SSO
		let person = await User.find({ _id: "5a63710527c6b237492fc1bb"});
		person = person[0];
		if (!person || person.accessTokens.length === 0 || person.itemID.length === 0) {
			throw Error("No Account Infromation Found");
		}

		ACCESS_TOKENS = person.accessTokens;
		ITEM_IDS = person.itemID;
		console.log(chalk.green("✓✓✓ ACCESS_TOKENS and ITEM_IDS have been set ✓✓✓"));
		res.sendStatus(200).end();
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			"ERROR": err
		});
	}

});*/

// Get Access Tokens and Item IDs from Plaid
Router.post("/get-access-token", async (req, res) => {

	const PUBLIC_TOKEN = req.body.public_token;
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
		req.session.save();

		// Update the db with the new account info
		User.update({ _id: req.session.user._id }, { $set: { accessTokens: currAccessTokens, itemID: currItemID } }, () => {
			console.log(chalk.green("New account has been saved"));
		});
	} catch (err) {
		console.log(err);
		return res.json({
			error: err
		});
	}
});

// Get Transaction information
Router.post("/transactions", async (req, res, next) => {
	// Default to past 30 days if no specific date is specified
	const days = req.body.days === undefined ? 30 : req.body.days;

	let tempStartDate;
	let tempEndDate;

	if (req.body.startDate && req.body.endDate) {
		tempStartDate = moment(new Date(req.body.startDate)).format("YYYY-MM-DD");
		tempEndDate = moment(new Date(req.body.endDate)).format("YYYY-MM-DD");
	}

	// Default to having today being the start date if no start date or end date were specified
	const startDate = tempStartDate || moment().subtract(days, "days").format("YYYY-MM-DD");
	const endDate = tempEndDate || moment().format("YYYY-MM-DD");

	try {
		const promiseArray = req.session.user.accessTokens.map(token => {
			return client.getTransactions(token, startDate, endDate, {
				count: 250,
				offset: 0,
			})
		});

		let totalData = await Promise.all(promiseArray);
		res.json(totalData);

	} catch (err) {
		if (err !== null && err.error_code === "INVALID_ACCESS_TOKEN") {
			console.log("TRANSACTIONS ERROR");
			console.log(err);
			return res.status(500).json({
				"ERROR": "Please force refresh the page. On Mac press Shift + Command + R. On Windows press Ctrl + F5"
			});
		}
	}
});

Router.post ("/balance", async (req, res, next) => {
	const promiseArray = req.session.user.accessTokens.map(token => client.getBalance(token) );

	let allData = await Promise.all(promiseArray);
	let banks = [];

	allData.forEach( (bank, index) => {
		let bankTotal = 0;
		let map = {};
		bank.accounts.forEach(acct => {
			if (acct.balances.current !== null && acct.type !== 'credit') {
				let value = acct.balances.current;
				bankTotal += value;
				map[acct.name] = value;
			} else if (acct.type !== 'credit') {
				map[acct.name] = "N/A";
			}
		});

		banks[index] = {"bankTotal": bankTotal, "map": map};
	});

	let networth = 0;
	banks.forEach(bank => {
		networth += bank.bankTotal;
	});

	let arrayOfMaps = [];
	banks.forEach( (bank, index) => {
		arrayOfMaps[index] = bank.map;
	})

	res.json({
		"networth": networth,
		"maps": arrayOfMaps
	});
});


Router.get('/linked-accounts', async (req, res) => {

	try {

		let banks = [];

		const itemInfo = req.session.user.accessTokens.map(token => client.getItem(token)); // Get Item ID for each access token
		let itemData = await Promise.all(itemInfo); // Wait for all the promises to resolve
		const ids = itemData.map(thing => client.getInstitutionById(thing.item.institution_id)); // Get the associated instituion for the given Item ID
		let data = await Promise.all(ids); // Wait for all the IDs to be processed
		data.forEach(place => banks.push(place.institution.name)); // Collate all the institutions into one array

		// Send back the array to the client
		res.json({
			"accounts": banks
		});

	} catch (err) {
		console.error(err);
	}
});

Router.post('/remove-account', async (req, res) => {
	// Index in the arrays that should be removed
	const i = req.body.data.bankIndex;

	// Remove the access token and item id for the corresponding bank
	const copyOfAccessTokens = req.session.user.accessTokens;
	const copyOfItemIDs = req.session.user.itemID;

	let newAccessTokens = [...copyOfAccessTokens.slice(0, i), ...copyOfAccessTokens.slice(i + 1)];
	let newItemIDs = [...copyOfItemIDs.slice(0,i), ...copyOfItemIDs.slice(i + 1)];

	try {
		// Update the values in the database
		const results = await User.update({ _id: req.session.user._id }, {
			$set: {
				accessTokens: newAccessTokens,
				itemID: newItemIDs
			}
		});

		console.log(chalk.green("Bank Removed"));
		req.session.user.accessTokens = newAccessTokens;
		req.session.user.itemID = newItemIDs;

		res.json({
			"status": req.body.data.bankName
		});

	} catch(err) {
		res.status(500).json({
			"ERROR": "An error has occurred, please refresh the page and try again in a few minutes"
		});
	}
});

module.exports = Router;
