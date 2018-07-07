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
const Strategy = require('passport-facebook').Strategy;
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

app.use('/plaid-api', require('./plaid-api.js'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/home-page.html'));
});

app.get('/budgeteer', checkAuthentication, (req, res) => {
	console.log('BUDGETEER GET');
	console.log(req.session.user);
	res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});

app.get('/budgeteer/*', checkAuthentication, (req, res) => {
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
passport.use(new Strategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: process.env.NODE_ENV === 'production' ? 'https://budgeteer-prod.herokuapp.com/' : 'https://budgeteer-prod.com:5000/login/facebook/return';
},



	function(accessToken, refreshToken, profile, cb) {
		// In this example, the user's Facebook profile is supplied as the user
		// record.  In a production-quality application, the Facebook profile should
		// be associated with a user record in the application's database, which
		// allows for account linking and authentication with other identity
		// providers.
		return cb(null, profile);
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
passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

app.get('/login/facebook',
	passport.authenticate('facebook')
);

app.get('/login/facebook/return',
	passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
		// req.user contains the fbProfile information

		User.findOne({ facebookID:req.user.id }, (err, existingUser) => {
            if (err) {console.log('EROORRRRR______________'); return }

            if (existingUser) {
				console.log('USER FOUND:');
				console.log(existingUser)
                req.session.user = existingUser;;
				return res.redirect('/budgeteer');
			} else {
				const fName = req.user.displayName.split(' ')[0];
				const lName = req.user.displayName.split(' ')[1];

				const newUser = new User ({
					facebookID: req.user.id,
					firstName: fName,
					lastName: lName
				});

				newUser.save( err => {
					if (err) {console.log(err); return}
					req.session.profile = existingUser;
				});

				return res.redirect('/');
			}
		});
	}
);

app.get('/profile', (req, res) => {
	if (req.session.user !== undefined) {
		res.send(req.session);
	} else {
		res.redirect('/nope');
	}
});

app.get('/nope', (req, res) => {
	res.send('NOPE');
});

function checkAuthentication(req,res,next){
    if(req.session.user !== undefined){
        next();
    } else{
        res.redirect('/nope');
    }
}

// function logInfo(req, res, next) {
// 	console.log();console.log();console.log();console.log();
// 	console.log(req.session);
// 	console.log();console.log();console.log();console.log();
// 	next();

// }

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
