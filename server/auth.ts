import express, { Request, Response } from 'express';
import path from 'path';
import passport from 'passport';
import mongoose from 'mongoose';
import FBPassport from 'passport-facebook';
import GooglePassport from 'passport-google-oauth';
import { User } from './types';

const FBStrategy = FBPassport.Strategy;
const GoogleStrategy = GooglePassport.OAuth2Strategy;

const authRouter = express.Router();
const User = mongoose.model('User');

authRouter.get('/', (_req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../public/home.html'));
});

authRouter.get('/logout', (req, res) => {
	req.logout();
	req.logOut();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
	req.session.destroy(() => {});
	res.redirect('/');

});

authRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.get('/google/return', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
		// Passportjs sends back the user attached to the request object, I set it as part of the session
		req.session.user = req.user;
		// Redirect to budgeteer or url they entered after the session has been set
		const returnURL = req.session.returnUrl ? req.session.returnUrl : '/budgeteer';
		res.redirect(returnURL);
	}
);

authRouter.get(
    '/facebook',
    passport.authenticate('facebook')
);

authRouter.get('/facebook/return', passport.authenticate('facebook'), (req, res) => {
	// Passportjs sends back the user attached to the request object, I set it as part of the session
	req.session.user = req.user;
	// Redirect to budgeteer or url they entered after the session has been set
	const returnURL = req.session.returnUrl ? req.session.returnUrl : '/budgeteer';
	res.redirect(returnURL);
});

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new FBStrategy(
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
			const user: User = await User.findOne({
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

passport.use(new GoogleStrategy(
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
			const user: User = await User.findOne({
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
passport.serializeUser(function(user: User, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

export default authRouter;
