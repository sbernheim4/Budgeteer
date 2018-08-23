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
	const val = req.body.data;
	console.log(typeof val);

	let currentObj = {}
	if (req.session.displayNames !== undefined) {
		currentObj = req.session.user.displayNames;
	}

	// Build new displayNames object
	const newDisplayNames = Object.assign(val, currentObj);

	// Save new object in DB -- Callback function is needed apparently so don't remove it
	User.update({ _id: req.session.user._id }, { displayNames: JSON.stringify(newDisplayNames) }, () => {});

	// Save new object in session
	req.session.user.displayNames = newDisplayNames;
	req.session.save();

});

Router.get("/display-names", (req, res) => {

	if (req.session.user.displayNames !== undefined) {
		// Send it from the session
		res.send(req.session.user.displayNames);
	} else {
		// Send it from the DB
		try {
			const record = User.findOne({
				_id: req.session.user._id
			});
			res.send(JSON.parse(record.displayNames));

		} catch(err) {
			// TODO: Send back some kind of error for the front end to parse
			console.log(err);
			res.json("ERROR");
		}
	}
});

module.exports = Router;
