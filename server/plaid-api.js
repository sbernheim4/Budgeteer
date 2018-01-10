

require("dotenv").config()

const express = require("express");
const app = express();
const path = require("path");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const moment = require("moment");
const plaid = require("plaid");

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV

// TODO:
// We store the access_token in memory - in production, store it in a secure persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

// Initialize the Plaid client
let client = new plaid.Client(
	PLAID_CLIENT_ID,
	PLAID_SECRET,
	PLAID_PUBLIC_KEY,
	plaid.environments[PLAID_ENV]
);

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());


app.all("*", (req, res, next) => {
	console.log(chalk.yellow(`--PLAID-API-- ${req.method} request for ${req.path}`));
	next();
})

// Send back the public key and the environment to plaid
app.get("/key-and-env", (req, res) => {
	let jsonResponse = {
		"publicKey": PLAID_PUBLIC_KEY.toString(),
		"env": PLAID_ENV.toString()
	}

	res.send(jsonResponse);
})

app.post("/get-access-token", function(req, res, next) {

	PUBLIC_TOKEN = req.body.public_token;
	client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {

		if (error !== null) {
			let msg = "Could not exchange public_token!";
			console.log(msg + "\n" + JSON.stringify(error));

			return res.json({
				error: msg
			});
		}

		ACCESS_TOKEN = tokenResponse.access_token;
		ITEM_ID = tokenResponse.item_id;

		console.log(chalk.green("✓✓✓ ACCESS_TOKEN and ITEM_ID have been set ✓✓✓"));

	});
});

app.post("/transactions", function(req, res, next) {

	const days = req.body.days || 30;

	// Pull transactions for the Item for the last 30 days
	const startDate = moment().subtract(days, "days").format("YYYY-MM-DD");
	const endDate = moment().format("YYYY-MM-DD");

	client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
		count: 250,
		offset: 0,
	}, function(error, transactionsResponse) {

		if (error !== null) {
			console.log(JSON.stringify(error));
			return res.json({
				error: error
			});
		}

		console.log("pulled " + transactionsResponse.transactions.length + " transactions");
		res.json(transactionsResponse);
	});
});

app.post("/institutions", (req, res) => {
	client.getInstitutions()
});

app.post ("/balance", (req, res, next) => {
	let netWorth = 0;

	client.getBalance(ACCESS_TOKEN).then(res => {

		// Sum up balances for each linked account
		res.accounts.forEach(acct => {
			if (acct.balances.available !== null) {
				netWorth += acct.balances.available;
			}
		});
		return netWorth;
	}).then( netWorth => {
		res.json({
			"netWorth": netWorth
		});
	}).catch(err => {
		console.error(err);
	});

});


module.exports = app;
