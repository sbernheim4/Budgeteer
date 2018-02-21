require("dotenv").config()

const express = require("express");
const app = express();
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

let ACCESS_TOKENS = [];
let PUBLIC_TOKEN = null;
let ITEM_IDS = [];

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

// Log All Requests
app.all("*", (req, res, next) => {
	console.log(chalk.yellow(`--PLAID-API-- ${req.method} request for ${req.path}`));
    next();
});

// Send back the public key and the environment to plaid
app.get("/key-and-env", (req, res) => {
	const jsonResponse = {
		"publicKey": PLAID_PUBLIC_KEY.toString(),
		"env": PLAID_ENV.toString()
	}

	res.send(jsonResponse);
});

app.post('/set-stored-access-token', async (req, res, next) => {

    let data;
    try {
        let person = await User.find({ _id: "5a63710527c6b237492fc1bb"});
        person = person[0];
        if (!person || person.accessTokens.length === 0 || person.itemID.length === 0) {

            let JSONError = JSON.stringify({ "Error": "No Account Infromation Found" });
            throw new Error(JSONError);
        }

        ACCESS_TOKENS = person.accessTokens;
        ITEM_IDS = person.itemID;
        console.log(chalk.green("✓✓✓ ACCESS_TOKENS and ITEM_IDS have been set ✓✓✓"));
    } catch (err) {
        console.log(err);
        return res.json(err);
    }

});

// Get Access Tokens and Item IDs from Plaid
app.post("/get-access-token", async (req, res, next) => {

    PUBLIC_TOKEN = req.body.public_token;
    try {
        // Get the token response
        let tokenResponse = await client.exchangePublicToken(PUBLIC_TOKEN);
        console.log(tokenResponse.access_token);
        console.log(tokenResponse.item_id);

        // Update our arrays on the server
        ACCESS_TOKENS.push(tokenResponse.access_token);
        ITEM_IDS.push(tokenResponse.item_id);

        // Update our arrays in the DB
        User.update({ _id: "5a63710527c6b237492fc1bb" }, { $set: { accessTokens: ACCESS_TOKENS, itemID: ITEM_IDS } }, () => {
            console.log(chalk.green("Update Successful"));
        });

        console.log(chalk.green("✓✓✓ ACCESS_TOKENS and ITEM_IDS have been UPDATEED ✓✓✓"));

    } catch (err) {
        console.log("ERROR:");
        console.log(err);
        return res.json({
            error: err
        });
    }

});

// Get Transaction information
app.post("/transactions", async function(req, res, next) {

    // Default to past 30 days if no specific date is specified
    const days = req.body.days || 30;

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
        const promiseArray = ACCESS_TOKENS.map(token => {
            return client.getTransactions(token, startDate, endDate, {
                count: 250,
                offset: 0,
            })
        });

        let totalData = await Promise.all(promiseArray);
        res.json(totalData);

    } catch (err) {
        if (err !== null) {
            console.log("TRANSACTIONS ERROR");
            console.log(JSON.stringify(err));
            console.log(err);
            return res.json({
                error: err
            });
        }
    }
});

app.post ("/balance", async function (req, res, next) {
    let netWorth = 0;
    let map = {};

    const promiseArray = ACCESS_TOKENS.map(token => {
        let x = client.getBalance(token);
        return x;
    });

    let totalData = await Promise.all(promiseArray);

    totalData.forEach(bank => {
        bank.accounts.forEach(acct => {
            if (acct.balances.available !== null) {
                let name = acct.name;
                let value = acct.balances.available;

                netWorth += value;
                map[name] = value;
            }
        });
    });

    res.json({
        "netWorth": netWorth,
        "myMap": map
    });
});


module.exports = app;
