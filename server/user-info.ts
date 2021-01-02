/* eslint no-undefined: off */

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { User } from './types';

const userInfoRouter = express.Router();
const User = mongoose.model('User');

userInfoRouter.use(
	bodyParser.urlencoded({
		extended: false
	})
);

userInfoRouter.use(bodyParser.json());

userInfoRouter.get('/profile', (req, res) => {
	// Send back all profile information
	res.send(req.session.user);
});

userInfoRouter.get('/monthly-budget', async (req, res) => {
	// Send back monthly budget from session variable or 0 if it doesn't exist
	if (req.session.user.monthlyBudget) {

		res.json({ monthlyBudget: req.session.user.monthlyBudget });

	} else {

		try {

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			const userData: User = await User.findOne({ _id: req.session.user._id }, () => {});

			if (userData.monthlyBudget === undefined) {
				throw new Error('No monthly budget found');
			} else {
				res.json({ monthlyBudget: userData.monthlyBudget });
			}


		} catch (err) {

			console.log(err);
			res.status(404).send(new Error('No monthly budget found'));

		}
	}
});

userInfoRouter.post('/monthly-budget', (req, res) => {
	const newMonthlyBudget = req.body.monthlyBudget;

	// Update monthly budget in DB
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	User.updateOne({ _id: req.session.user._id }, { monthlyBudget: newMonthlyBudget }, () => {});

	// Update monthlyBudget in session
	req.session.user.monthlyBudget = newMonthlyBudget;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	req.session.save(() => {});

	res.status(204).end();
});

userInfoRouter.get('/name', (req, res) => {
	// Send back user's name
	res.send(req.session.user.name);
});

userInfoRouter.get('/last-accessed', async (req, res) => {
	if (req.session.user.lastAccessed !== undefined) {
		const lastAccessed = new Date(req.session.user.lastAccessed);

		res.send(lastAccessed);
	} else {
		try {
			const record: User = await User.findOne({
				_id: req.session.user._id
			});

			const date = new Date(record.lastAccessed);

			res.send(date);
		} catch (err) {
			console.error(err);

			res.json('ERROR');
		}
	}
});

userInfoRouter.post('/last-accessed', (req, res) => {
	const date = req.body.date;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	User.updateOne({ _id: req.session.user._id }, { lastAccessed: date.toString() }, () => {});

	req.session.user.lastAccessed = date;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	req.session.save(() => {});

	res.status(204).end();

});

userInfoRouter.get('/display-names', async (req, res) => {
	if (req.session.user.displayNames !== undefined) {
		const serializedMap = req.session.user.displayNames;
		res.json(serializedMap);
	} else {
		try {
			const record: User = await User.findOne({
				_id: req.session.user._id
			});
			const serializedMap = record.displayNames;

			//TODO: Might just want to return an empty map then...
			if (serializedMap === undefined) throw new Error('No account display names found :(');

															 // Store it on the session for next time
															 req.session.user.displayNames = serializedMap;

														 // Send it back to the client
														 res.json(serializedMap);
		} catch (err) {
			// TODO: Send back some kind of error for the front end to parse
			res.status(404)
		.json('Error in GET /user-info/display-names')
		.end();
		console.error(err);
		}
	}
});

userInfoRouter.post('/display-names', (req, res) => {
	const serializedMap = req.body.data.map;

	// Save new object in DB -- Callback function is needed apparently so don't remove it
	User.updateOne({ _id: req.session.user._id }, { displayNames: serializedMap }, () => {
		console.log('Updated display names');
	});

	// Save new object in session
	req.session.user.displayNames = serializedMap;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	req.session.save(() => {});

	res.status(204).end();
});

export default userInfoRouter;
