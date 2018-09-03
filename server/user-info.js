/* eslint no-undefined: off */

const express = require("express");
const Router = express.Router();
const path = require("path");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = mongoose.model('User');

Router.use(bodyParser.urlencoded({
	extended: false
}));

Router.use(bodyParser.json());

Router.post('/monthly-budget', (req, res) => {
	// Update monthly budget on session and DB
	User.update({ _id: req.session.user._id }, { monthlyBudget: req.body.monthlyBudget }, () => {});
	req.session.user.monthlyBudget = req.body.monthlyBudget;
	req.session.save();
});

Router.get('/monthly-budget', (req, res) => {
	// Send back monthly budget from session variable or 0 if it doesn't exist
	if (req.session.user.monthlyBudget) {
		res.json({"monthlyBudget": req.session.user.monthlyBudget});
	} else {
		res.json({"monthlyBudget": 0});
	}
});

Router.get('/profile', (req, res) => {
	// Send back all profile information
	res.send(req.session.user);
});

Router.get('/name', (req, res) => {
	// Send back user's name
	res.send(req.session.user.name);
});

Router.get("/last-accessed", (req, res) => {
	if (req.session.user.lastAccessed !== undefined) {
		// Try the session
		const lastAccessed = new Date(req.session.user.lastAccessed);
		res.send(lastAccessed);
	} else {
		// Try the DB
		try {
			const record = User.findOne({
				_id: req.session.user._id
			});
			const x = new Date(record.lastAccessed);
			res.send(x);
		} catch(err) {
			// TODO: Send back some kind of error for the front end to parse
			console.log(err);
			res.json("ERROR");
		}

	}
});

Router.post("/last-accessed", (req, res) => {
	const date = req.body.date;
	User.update({ _id: req.session.user._id }, { lastAccessed: date.toString() }, () => {});

	req.session.user.lastAccessed = date;
	req.session.save();
});

Router.post("/display-names", (req, res) => {
	// Stored as Map obj in DB
	// Stored as JSON in session

	const val = JSON.parse(req.body.data.map);
	const currentMap = req.session.user.displayNames;
	const updatedMap = currentMap !== undefined ? new Map([...currentMap, ...val]) : new Map ([...val]);

	// Save new object in DB -- Callback function is needed apparently so don't remove it
	User.update({ _id: req.session.user._id }, { displayNames: updatedMap }, () => {
		console.log(chalk.green("DB Updated"));
		console.log(updatedMap);
	});

	// Save new object in session
	req.session.user.displayNames = mapToJson(updatedMap);
	req.session.save();
});

Router.get("/display-names", async (req, res) => {

	if (req.session.user.displayNames !== undefined) {
		const serializedMap = req.session.user.displayNames;
		// Send it from the session
		console.log(chalk.red("Sending from session"));
		console.log(serializedMap);
		res.json(serializedMap);
	} else {
		// Send it from the DB
		try {
			const record = await User.findOne({
				_id: req.session.user._id
			});
			console.log("GET displayNames from DB");

			const serializedMap = mapToJson(record.displayNames);
			res.json(serializedMap);
		} catch(err) {
			// TODO: Send back some kind of error for the front end to parse
			res.json("Error in GET /user-info/display-names");
			console.log(err);
		}
	}
});

function mapToJson(map) {
    return JSON.stringify([...map]);
}

function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

module.exports = Router;
