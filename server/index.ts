import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import https from 'https';
import util from 'util';
import bodyParser from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import chalk from 'chalk';

// Route Handlers
import legal from './legal';
import plaidApi from './plaid-api';
import userInfo from './user-info';
import savingsRouter from './savings';
import auth from './auth';

import startDB from './db';

const app = express();

/****************** DB Options ******************/
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const sessionInfo = session({
	secret: 'jfadhsnfijhu]0i32iekn245u280ur32U0JFL2342fdsaANSL',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 600000 }
});

if (process.env.DB_URI) {
	const sessionStore = MongoStore(session);
	sessionInfo['store'] = new sessionStore({ mongooseConnection: mongoose.connection });
}

app.use(sessionInfo);
/***************** DB Options ******************/

let options = {};

if (process.env.NODE_ENV !== 'production') {

	const keyPath = path.resolve('server/encryption/budgeteer-prod.com-key.pem');
	const certPath = path.resolve('server/encryption/budgeteer-prod.com.pem');

	options = {
		key: fs.readFileSync(keyPath),
		cert: fs.readFileSync(certPath)
	};
}

/****************** Server Options ******************/
const cacheTime = 172800000; // 2 Days
app.use(helmet()); // Sets some good default headers
app.use(compression()); // Enables gzip compression
app.use(bodyParser.json()); // Lets express handle JSON encoded data sent on the body of requests
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

/****************** Serve Static Files --> JS, CSS, Images  ******************/
app.use(express.static(path.resolve('static-assets'), { maxAge: cacheTime }));
app.use(express.static(path.resolve('public'), { maxAge: cacheTime }));

/****************** Log Requests ******************/
app.all('*', (req, _res, next) => {
	console.log('--------------------------------------------------------------------------');
	console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
	console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
	console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
	next();
});

/****************** Handle Requests ******************/
app.use('/legal', legal);

app.use('/plaid-api', checkAuthentication, plaidApi);

app.use('/user-info', checkAuthentication, userInfo);

app.use('/savings', checkAuthentication, savingsRouter);

app.get('/', (_req, res) => {
	res.sendFile(path.resolve('public/home.html'));
});

app.use('/login', auth);

// TODO: For some reason this is needed. Visiting budgeteer.org makes a request for /budgeteer/budgeteer.js instead of just /budgeteer.js
app.get('/budgeteer/*.js', checkAuthentication, (_req, res) => {
	res.sendFile(path.resolve('public/budgeteer.html'));
});

app.get('/budgeteer', checkAuthentication, (_req, res) => {
	res.sendFile(path.resolve('public/budgeteer.html'));
});

app.get('/budgeteer/*', checkAuthentication, (_req, res) => {
	res.sendFile(path.resolve('public/budgeteer.html'));
});

app.get('*', (_req, res) => {
	res.status(404).send(`<h1>404 Page Not Found</h1>`);
});

function checkAuthentication(req: Request, res: Response, next: () => void) {
	// Check if the user variable on the session is set. If not redirect to /login
	// otherwise carry on (https://www.youtube.com/watch?v=2X_2IdybTV0)
	if (req.session.user) { // eslint-disable-line no-undefined
		// User is authenticated :)
		next();
	} else {
		// User is not authenticated :(

		// If the user tried to go straight to /budgeteer/transactions without being
		// logged in store the route they tried to visit in the session to redirect
		// them too after authentication completes
		req.session.returnUrl = req.url;

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		req.session.save(() => {});

		res.redirect('/login');
	}
}

function startServer() {
	if (process.env.NODE_ENV !== 'production') {
		https.createServer(options, app).listen(process.env.PORT);
		console.log(chalk.blue(`App is live on ${process.env.DEV_BASE_URL}`));
	} else {
		app.listen(process.env.PORT, () => {
			console.log('Started server');
		});
	}
}

async function bootup() {
	try {

		await startDB();

	} catch (error) {

		console.log(chalk.red(`process.env.DB_URI is undefined (this should be set in your .env file).`));
		console.log(chalk.red(`Not connecting to MongoDB. Sessions are being stored in memory`));
		console.log(error);

	}

	startServer();
}

bootup();

