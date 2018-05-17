require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const chalk = require("chalk");
const compression = require('compression');
const mongoose = require('mongoose');
const startDb = require('./db');
const fs = require('fs');
const https = require('https');
const http = require('http');
const util = require('util');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

app.use(require('express-session')({
	secret: 'jfadhsnfijhu]0i32iekn245u280ur32U0JFL2342fdsaANSL', resave: true, saveUninitialized: true }
));

const options = {
	key: fs.readFileSync('encryption/server.key'),
	cert: fs.readFileSync('encryption/server.crt'),
	ca: fs.readFileSync('encryption/server.csr')
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

/****************** DB Options ******************/
const mongodbUri = process.env.DB_URI;

mongoose.connect(mongodbUri);
let db = mongoose.connection;

/****************** Server Options ******************/
const port = process.env.PORT;
const insecurePort = process.env.INSECURE_PORT;
const cacheTime = 172800000; // 2 Days

app.use(compression());

/****************** SERVE STATIC FILES --> JS, CSS, IMAGES ETC ******************/
app.use(express.static(path.join(__dirname, "../public"), { maxAge: cacheTime } ));

/****************** Handle Requests ******************/
app.all("*", (req, res, next) => {
	console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
    console.log('--------------------------------------------------------------------------');

	next();
});

app.use("/plaid-api", require("./plaid-api.js"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/home-page.html"));
});

app.get("/budgeteer", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/budgeteer.html"));
});

app.get("/budgeteer/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/budgeteer.html"));
});


/****************** Passport Authentication ******************/

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: 'https://budgeteer-prod.herokuapp.com/login/facebook/return'
	},

	function(accessToken, refreshToken, profile, cb) {
		console.log("access token:\t", accessToken);
		console.log("refresh token:\t", refreshToken);
		console.log("profile:\t", profile);
		// In this example, the user's Facebook profile is supplied as the user
		// record.  In a production-quality application, the Facebook profile should
		// be associated with a user record in the application's database, which
		// allows for account linking and authentication with other identity
		// providers.
		return cb(null, profile);
	}
));


app.get('/login/facebook',
	passport.authenticate('facebook')
);

app.get('/login/facebook/return',
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
	});

app.get('/profile',
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res){
		res.render('profile', { user: req.user });
	}
);

/****************** Start the DB and Server ******************/

if (process.env.NODE_ENV === "development") {
	startDb.then(() => {
		https.createServer(options, app).listen(port);
		http.createServer(app).listen(insecurePort);
		console.log(chalk.green(`Listening securely on port ${port}`));
		console.log(chalk.green(`Listening insecurely on port ${insecurePort}`))
	}).catch(err => {
		console.log(err);
	});
} else if (process.env.NODE_ENV === "production") {

	startDb.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Listening on port ${port}`));
		});

	}).catch(err => {
		console.log(err);
	});
}

