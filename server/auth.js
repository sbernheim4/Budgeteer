const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const FBStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const router = express.Router();
const User = mongoose.model('User');

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/home.html'));
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
	console.log("Logging in via Google");
});

router.get('/google/return', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
	// Passportjs sends back the user attached to the request object, I set it as part of the session
	req.session.user = req.user;
	// Redirect to budgeteer or url they entered after the session has been set
	const returnURL = req.session.returnUrl !== undefined ? req.session.returnUrl : '/budgeteer';
	res.redirect(returnURL);
});

router.get('/facebook', passport.authenticate('facebook'), (req, res) => {
	console.log("Logging in via FB");
});

router.get('/facebook/return', passport.authenticate('facebook'), (req, res) => {
	// Passportjs sends back the user attached to the request object, I set it as part of the session
	req.session.user = req.user;
	// Redirect to budgeteer or url they entered after the session has been set
	const returnURL = req.session.returnUrl !== undefined ? req.session.returnUrl : '/budgeteer';
	res.redirect(returnURL);
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
	callbackURL: process.env.NODE_ENV === 'production' ? 'https://www.budgeteer.org/login/facebook/return' : `${process.env.DEV_BASE_URL}/login/facebook/return`
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
	callbackURL: process.env.NODE_ENV === 'production' ? 'https://www.budgeteer.org/login/google/return' : `${process.env.DEV_BASE_URL}/login/google/return`
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

module.exports = router;
