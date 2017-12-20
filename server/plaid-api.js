'use strict'

require('dotenv').config()

const express = require(`express`);
const app = express();
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const moment = require('moment');
const plaid = require('plaid');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
	PLAID_CLIENT_ID,
	PLAID_SECRET,
	PLAID_PUBLIC_KEY,
	plaid.environments[PLAID_ENV]
);

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());


app.all('*', (req, res, next) => {
	console.log(chalk.yellow(`---PLAID-API--- ${req.method} request for ${req.path}`));
	next();
})

app.get('/key-and-env', (req, res) => {

	console.log("HERE");
	console.log(PLAID_PUBLIC_KEY.toString());
	console.log(PLAID_ENV.toString());

	let jsonResponse = {
		"publicKey": PLAID_PUBLIC_KEY.toString(),
		"env": PLAID_ENV.toString()
	}

	// res.send(PLAID_PUBLIC_KEY);

	res.send(jsonResponse);
})

module.exports = app;
