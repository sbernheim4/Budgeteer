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

let ACCESS_TOKENS = null;
let PUBLIC_TOKEN = null;
let ITEM_IDS = null;

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

app.post('/set-stored-access-token', (req, res, next) => {
    user.find({}).then(data => {
        if (data.length === 0) {
            res.send("NOT SET");
        } else {
            console.log("USER FOUND\n");
            // user already exists so get their info from the result of the DB call
            ACCESS_TOKENS = data[0].accessTokens;
            ITEM_IDS = data[0].itemID;
            console.log(chalk.green("✓✓✓ ACCESS_TOKENS and ITEM_IDS have been set ✓✓✓"));
            res.json({
                "SET": true
            })
        }
    })
});

// Get Access Tokens and Item IDs from Plaid
app.post("/get-access-token", function(req, res, next) {

    // If ACCESS_TOKENS and ITEM_IDS are not null then return
    if (ACCESS_TOKENS !== null && ITEM_IDS !== null ) {
        return;
    }

    // Otherwise set them
    PUBLIC_TOKEN = req.body.public_token;

    client.exchangePublicToken(PUBLIC_TOKEN).then(tokenResponse => {
        ACCESS_TOKENS = [tokenResponse.access_token];
        ITEM_IDS = [tokenResponse.item_id];

        user.create({
            accessTokens: [tokenResponse.access_token],
            itemID: [tokenResponse.item_id]
        });

        console.log("USER CREATED");
        console.log(chalk.green("✓✓✓ ACCESS_TOKENS and ITEM_IDS have been set ✓✓✓"));
    }).catch(err => {
        if (error !== null) {
            let msg = "Could not exchange public_token!";
            console.log(msg + "\n" + JSON.stringify(error));
            return res.json({
                error: msg
            });
        }
    });
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
        const promiseArray = ACCESS_TOKENS.map((token) => {
            const content = client.getTransactions(token, startDate, endDate, {
                count: 250,
                offset: 0,
            })
            return content;
        });

        let totalData = await Promise.all(promiseArray);
        console.log(totalData);
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

    // .then(data => {
    //     Object.assign(totalData, data)
    // }).catch(err => {
    //
    //     }
    // });

    //TODO: This is happening asynchronously so need to find a way to only do this after the for each loop is done
    // Maybe put it in its own async function and do an await call

});



// app.post("/institutions", (req, res) => {
// 	client.getInstitutions()
// });

// Get Balances
app.post ("/balance", (req, res, next) => {
    let netWorth = 0;

    ACCESS_TOKENS.forEach(token => {
        client.getBalance(token).then(res => {
            // Sum up balances for each linked account
            res.accounts.forEach(acct => {
                if (acct.balances.available !== null) {
                    netWorth += acct.balances.available;
                }
            });
        }).catch(err => {
            console.log("BALANCE ERROR");
            console.log(JSON.stringify(err));

            return res.json({
                error: err
            });
        });
    });

    //TODO: This is happening asynchronously so need to find a way to only do this after the for each loop is done
    // Maybe put it in its own async function and do an await call
    res.json({
        "netWorth": netWorth
    })
});

module.exports = app;
