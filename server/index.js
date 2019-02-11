/* eslint no-undefined: "off" */

require("dotenv").config();

const fs = require('fs');
const path = require('path');
const util = require('util');
const https = require('https');
const express = require('express');
const app = express();
const chalk = require('chalk');
const compression = require('compression');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const FBStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const startDb = require("./db");

const User = mongoose.model('User');

/****************** DB Options ******************/
const mongodbUri = process.env.DB_URI;

mongoose.connect(mongodbUri, { useNewUrlParser: true });
let db = mongoose.connection;

// If you have set `DB_URI` env var in your `.env` file then use that DB to store sessions
if (process.env.DB_URI) {
	app.use(session({
		secret: 'jfadhsnfijhu]0i32iekn245u280ur32U0JFL2342fdsaANSL',
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 600000 },
		store: new MongoStore({ mongooseConnection: mongoose.connection }) // Use mong to store sessions
	}));
} else {
	app.use(session({
		secret: 'jfadhsnfijhu]0i32iekn245u280ur32U0JFL2342fdsaANSL',
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 600000 }
	}));
}

const options = {
	key: fs.readFileSync(path.join(__dirname, './encryption/server.key')),
	cert: fs.readFileSync(path.join(__dirname, './encryption/server.crt')),
	ca: fs.readFileSync(path.join(__dirname, './encryption/server.csr'))
};


/****************** Server Options ******************/
const cacheTime = 172800000; // 2 Days
app.use(helmet()); // Sets some good default headers
app.use(compression()); // Enables gzip compression
app.use(bodyParser.json()) // Lets express handle JSON encoded data sent on the body of requests
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

/****************** Serve Static Files --> JS, CSS, Images  ******************/
app.use(express.static(path.join(__dirname, '../static-assets'), { maxAge: cacheTime } ));
app.use(express.static(path.join(__dirname, '../public'), { maxAge: cacheTime } ));

/****************** Log Requests ******************/
app.use('*', (req, res, next) => {
	console.log('--------------------------------------------------------------------------');
	console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
	console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
	console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));

	next();
});

/****************** Handle Requests ******************/

app.use('/legal', require('./legal.js'));

app.use('/plaid-api', checkAuthentication, require('./plaid-api.js'));

app.use('/user-info', checkAuthentication, require('./user-info.js'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/home.html'));
});

app.use('/login', require("./auth.js"));

// TODO: For some reason this is needed. Visiting budgeteer.org makes a request for /budgeteer/budgeteer.js instead of just /budgeteer.js
app.get('/budgeteer/*.js', checkAuthentication, (req, res) => {
	res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});

app.get('/budgeteer', checkAuthentication, (req, res) => {
	res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});

app.get('/budgeteer/*', checkAuthentication, (req, res) => {
	res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});

app.get("*", (req, res) => {
	res.status(404).send(`<h1>404 Page Not Found</h1>`);
});

function checkAuthentication(req, res, next) {
	// Check if the user variable on the session is set. If not redirect to /login
	// otherwise carry on (https://www.youtube.com/watch?v=2X_2IdybTV0)
	if (req.session.user !== undefined) {
		// User is authenticated :)
		next();
	} else {
		// User is not authenticated :(

		// If the user tried to go straight to /budgeteer/transactions without being
		// logged in store the route they tried to visit in the session to redirect
		// them too after authentication completes
		req.session.returnUrl = req.url;
		req.session.save();

		res.redirect('/login');
	}
}

/****************** Start the DB and Server ******************/
if (process.env.DB_URI && process.env.DB_URI !== '') {
	startDb.then(() => {
		startServer();
	}).catch(err => {
		console.log(err);
	})
} else {
	console.log(chalk.red('process.env.DB_URI is undefined (this should be set in your .env file).\nSkipping opening connection to DB.\nSessions are being stored in memory'));
	startServer();
}

function startServer() {
    https.createServer(options, app).listen(process.env.PORT);
    console.log(chalk.green(`App is live on ${process.env.DEV_BASE_URL}`));
}
