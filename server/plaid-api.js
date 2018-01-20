require("dotenv").config()

const express = require("express");
const app = express();
const path = require("path");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const moment = require("moment");
const plaid = require("plaid");

const mongoose = require('mongoose');
const user = mongoose.model('User');

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
});

// Send back the public key and the environment to plaid
app.get("/key-and-env", (req, res) => {
	const jsonResponse = {
		"publicKey": PLAID_PUBLIC_KEY.toString(),
		"env": PLAID_ENV.toString()
	}

	res.send(jsonResponse);
});

app.post("/get-access-token", function(req, res, next) {

    user.find({}, function (err, data) {
        if (err) {
            console.log(err)
        } else if (data.length === 0) {
            // no user previously found

            PUBLIC_TOKEN = req.body.public_token;

            client.exchangePublicToken(PUBLIC_TOKEN).then(tokenResponse => {
                ACCESS_TOKEN = tokenResponse.access_token;
                ITEM_ID = tokenResponse.item_id;

                user.create({
                    accessTokens: [ACCESS_TOKEN],
                    itemID: [ITEM_ID]
                });
                console.log("USER CREATED");

            }).catch(err => {
                if (error !== null) {
                    let msg = "Could not exchange public_token!";
                    console.log(msg + "\n" + JSON.stringify(error));
                    return res.json({
                        error: msg
                    });
                }
            });
        } else {
            // user already exists so get their info from the result of the DB call
            ACCESS_TOKEN = data[0].accessTokens[0];
            ITEM_ID = data[0].itemID[0];
        }
    });

    console.log(chalk.green("✓✓✓ ACCESS_TOKEN and ITEM_ID have been set ✓✓✓"));

});

app.post("/transactions", function(req, res, next) {

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

    /*
    Below is an example of how to get data from multiple accounts for a user
    based on storing access_tokens for their accounts

    // Store access tokens in an array
    accessTokens = ["access-sandbox-c872291a-38a4-490b-bece-b5d6fe91b75d",
                    "access-sandbox-1bec78b6-a879-4ea0-8034-67f71ce9413a"
    ]

    // For each token make a request and log the data to the console
    // Really it should join all the data together and then send that to the browser
    data is just a JS object {}

    let totalData = {}
    accessTokens.forEach(token => {
        client.getTransactions(token, startDate, endDate, {
            count: 250,
            offset: 0,
        }).then(data => {
            console.log("------------ NEW DATA ------------");
            console.log(data)
            Object.assign(totalData, data)
            console.log("------------ END DATA ------------");
        })
    });

    res.json(totalData)
    */

    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
        count: 250,
        offset: 0,
    }).then(data => {
        console.log("pulled " + data.transactions.length + " transactions");
        res.json(data)
    }).catch(err => {
        if (err !== null) {
            console.log("ERROR");
            console.log(JSON.stringify(err));
            return res.json({
                error: err
            });
        }
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

        console.log("netWorth:", netWorth);
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
