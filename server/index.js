/* eslint no-undefined: "off" */

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const compression = require('compression');
const mongoose = require('mongoose');
const startDb = require('./db');
const fs = require('fs');
const https = require('https');
const http = require('http');
const util = require('util');
const bodyParser = require('body-parser');
const passport = require('passport');
const FBStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const User = mongoose.model('User');

/****************** DB Options ******************/
const mongodbUri = process.env.DB_URI;

mongoose.connect(mongodbUri);
let db = mongoose.connection;

app.use(session({
	secret: 'jfadhsnfijhu]0i32iekn245u280ur32U0JFL2342fdsaANSL',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 600000 },
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

const options = {
	key: fs.readFileSync('encryption/server.key'),
	cert: fs.readFileSync('encryption/server.crt'),
	ca: fs.readFileSync('encryption/server.csr')
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

/****************** Server Options ******************/
const port = process.env.PORT;
const insecurePort = process.env.INSECURE_PORT;
const cacheTime = 172800000; // 2 Days

app.use(compression());

/****************** SERVE STATIC FILES --> JS, CSS, IMAGES ETC ******************/
app.use(express.static(path.join(__dirname, '../public'), { maxAge: cacheTime } ));

/****************** Handle Requests ******************/
app.all('*', (req, res, next) => {
	console.log('--------------------------------------------------------------------------');
	console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
	console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
	console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));

	next();
});

app.use('/legal', require('./legal.js'));

app.use('/plaid-api', checkAuthentication, require('./plaid-api.js'));

app.use('/user-info', checkAuthentication, require('./user-info.js'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/home-page.html'));
});

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/home-page.html'));
});

app.get('/portal', checkAuthentication, (req, res) => {
	res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});

app.get('/portal/*', checkAuthentication, (req, res) => {
	res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});

/****************** Passport Authentication ******************/

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new FBStrategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: process.env.NODE_ENV === 'production' ? 'https://www.budgeteer.org/login/facebook/return' : 'https://budgeteer-prod.com:5000/login/facebook/return'
},
	function(accessToken, refreshToken, profile, done) {
		// In this example, the user's Facebook profile is supplied as the user
		// record.  In a production-quality application, the Facebook profile should
		// be associated with a user record in the application's database, which
		// allows for account linking and authentication with other identity
		// providers.

		User.findOne({
			facebookID: profile.id
		}).then((dbUserRecord, err) => {
			if (dbUserRecord) {
				done(null, dbUserRecord);
			} else {
				new User({
					facebookID: profile.id,
					name: profile.displayName
				}).save().then((newUser) => {
					done(null, newUser);
				});
			}
		}).catch(err => {
			console.log(err);
		});
	}
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' ? 'https://www.budgeteer.org/login/google/return' : 'https://budgeteer-prod.com:5000/login/google/return'
},
  	function(accessToken, refreshToken, profile, done) {
	  	User.findOne({
			googleID: profile.id
		}).then((dbUserRecord, err) => {
			if (dbUserRecord) {
				done(null, dbUserRecord);
			} else {
				new User({
					googleID: profile.id,
					name: profile.displayName
				}).save().then((newUser) => {
					done(null, newUser);
				});
			}
		}).catch(err => {
			console.log(err);
		});
	}
));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then(user => {
		done(null, user);
	});
});

app.get('/login/google', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
	console.log("Logging in via Google");
});

app.get('/login/google/return', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
	// Passportjs sends back the user attached to the request object, I set it as part of the session
	req.session.user = req.user;
	// Redirect to portal after the session has been set
	res.redirect("/portal");
});


app.get('/login/facebook', passport.authenticate('facebook'), (req, res) => {
	console.log("Logging in via FB");
});

app.get('/login/facebook/return', passport.authenticate('facebook'), (req, res) => {
	// Passportjs sends back the user attached to the request object, I set it as part of the session
	req.session.user = req.user;
	// Redirect to portal after the session has been set
	res.redirect("/portal");
});

app.get('/profile', checkAuthentication, (req, res) => {
	res.send(req.session);
});

app.get('/nope', (req, res) => {
	res.send('NOPE');
});

function checkAuthentication(req, res, next) {
	// Check if the user variable on the session is set. If not redirect to /nope
	// otherwise carry on (https://www.youtube.com/watch?v=2X_2IdybTV0)
    if (req.session.user !== undefined) {
        next();
    } else {
        res.redirect('/login');
    }
}

/****************** Start the DB and Server ******************/

if (process.env.NODE_ENV === 'development') {
	startDb.then(() => {
		https.createServer(options, app).listen(port);
		http.createServer(app).listen(insecurePort);
		console.log(chalk.green(`Listening securely on port ${port}`));
		console.log(chalk.green(`Listening insecurely on port ${insecurePort}`))
	}).catch(err => {
		console.log(err);
	});
} else if (process.env.NODE_ENV === 'production') {

	startDb.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Listening on port ${port}`));
		});
	}).catch(err => {
		console.log(err);
	});
}
