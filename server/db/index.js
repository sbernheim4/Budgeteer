'use strict';

require("dotenv").config();
const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect(process.env.DB_URI);
let db = mongoose.connection;

// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./models');

const startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', console.error.bind(console, 'connection error:'));
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));

startDbPromise.then( () => {
    console.log(chalk.blue('MongoDB connection opened!'));
});

module.exports = startDbPromise;
