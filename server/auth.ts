import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import passport from 'passport';
import mongoose from 'mongoose';
import chalk from 'chalk';

import { IUser } from './types';

const FBStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const authRouter = express.Router();
const User = mongoose.model('User');

authRouter.all('*', (req: Request, _res: Response, next: NextFunction) => {
	console.log(
		chalk.yellow(`

------- Auth Router ${req.method} request for /login${req.url} ----------

`)
	);

	next();
});

authRouter.get('/', (_req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../public/home.html'));
});

authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }), (_req, _res) => {
	console.log('Logging in via Google');
});

authRouter.get(
	'/google/return',
	passport.authenticate('google', { scope: ['email', 'profile'] }),
	(req: Request, res: Response) => {
		// Passportjs sends back the user attached to the request object, I set it as part of the session
		req.session.user = req.user;
		// Redirect to budgeteer or url they entered after the session has been set
		const returnURL = req.session.returnUrl ? req.session.returnUrl : '/budgeteer';
		res.redirect(returnURL);
	}
);

authRouter.get('/facebook', passport.authenticate('facebook'), (_req, _res) => {
	console.log('Logging in via FB');
});

authRouter.get('/facebook/return', passport.authenticate('facebook'), (req: Request, res: Response) => {
	// Passportjs sends back the user attached to the request object, I set it as part of the session
	req.session.user = req.user;
	// Redirect to budgeteer or url they entered after the session has been set
	const returnURL = req.session.returnUrl ? req.session.returnUrl : '/budgeteer';
	res.redirect(returnURL);
});

function checkAuthentication(req: Request, res: Response, next: NextFunction) {
	// Check if the user variable on the session is set. If not redirect to /login
	// otherwise carry on (https://www.youtube.com/watch?v=2X_2IdybTV0)
	if (req.session.user) {
		// User is authenticated :)
		next();
	} else {
		// User is not authenticated :(

		// If the user tried to go straight to /budgeteer/transactions without being
		// logged in, store the route they tried to visit in the session to redirect
		// them to after authentication completes
		req.session.returnUrl = req.url;
		req.session.save(() => {});

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
passport.use(
	new FBStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL:
				process.env.NODE_ENV === 'production'
					? 'https://www.budgeteer.org/login/facebook/return'
					: `${process.env.DEV_BASE_URL}/login/facebook/return`
		},
		async function(_accessToken, _refreshToken, profile, done) {
			// In this example, the user's Facebook profile is supplied as the user
			// record.  In a production-quality application, the Facebook profile should
			// be associated with a user record in the application's database, which
			// allows for account linking and authentication with other identity
			// providers.

			try {
				const user: IUser = await User.findOne({
					facebookID: profile.id
				});

				if (user) {
					done(null, user);
				} else {
					const newUser = new User({
						facebookID: profile.id,
						name: profile.displayName
					});

					await newUser.save();

					done(null, newUser);
				}
			} catch (err) {
				console.error(err);
			}
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL:
				process.env.NODE_ENV === 'production'
					? 'https://www.budgeteer.org/login/google/return'
					: `${process.env.DEV_BASE_URL}/login/google/return`
		},
		async function(_accessToken, _refreshToken, profile, done) {
			try {
				const user: IUser = await User.findOne({
					googleID: profile.id
				});

				if (user) {
					done(null, user);
				} else {
					const newUser = new User({
						googleID: profile.id,
						name: profile.displayName
					});

					await newUser.save();

					done(null, newUser);
				}
			} catch (err) {
				console.error(err);
			}
		}
	)
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user: IUser, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

export default authRouter;
