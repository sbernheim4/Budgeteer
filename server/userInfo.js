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
	User.update({ _id: req.session.user._id }, { $set: { monthlyBudget: req.body.monthlyBudget } });
	req.session.user.monthlyBudget = req.body.monthlyBudget;
	req.session.save();
});


// Used by navbar.jsx to display the users name
Router.get('/name', (req, res) => {
	res.send(req.session.user.name);
});

Router.get('/profile', (req, res) => {
	console.log(req.session.user);
	res.send(req.session.user);
})

module.exports = Router;
