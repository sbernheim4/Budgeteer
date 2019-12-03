import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { IUser, IHistoricalData } from './../types';

const User = mongoose.model('User');
const savingsRouter = express.Router();

savingsRouter.use(
	bodyParser.urlencoded({
		extended: false
	})
);

savingsRouter.use(bodyParser.json());

savingsRouter.post('/data', async (req) => {

	const data = req.body;
	const userId = req.session.user._id;
	const userInfo: IUser = await User.findOne({ _id: req.session.user._id });
	const savings = userInfo.savings || [];
	const date = new Date();
	const savingsData = {
		date,
		savingsData: data
	};
	const updatedHistoricalData = [...savings, savingsData];

	try {

		await User.updateOne({ _id: userId }, { savings: updatedHistoricalData });

	} catch (error) {

		console.log(error);

	}

});

savingsRouter.get('/data', async (req, res) => {

	const institutionId = req.query.id;
	const userId = req.session.user._id;
	let savings: IHistoricalData[];

	try {
		const userData: IUser = await User.findOne({ _id: userId });
		savings = userData.savings;
	} catch (error) {
		savings = [];
	}

	const institutionHistoricalData = savings.map(data => {

		const { date, savingsData } = data;
		const currAccount = savingsData.filter(institution => {
			return institution.institutionId === institutionId
		});

		return {
			date,
			savingsData: currAccount
		}

	});

	res.json(institutionHistoricalData);

});

export default savingsRouter;
