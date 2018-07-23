require("dotenv").config()

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
	User.update({ _id: req.session.user._id }, { $set: { monthlyBudget: req.body.monthlyBudget } });
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

Router.get('/name', (req, res) => {
	// Send back user's name 
	res.send(req.session.user.name);
});

Router.get('/profile', (req, res) => {
	// Send back all profile information
	res.send(req.session.user);
});

module.exports = Router;
