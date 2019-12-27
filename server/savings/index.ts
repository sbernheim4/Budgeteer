import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { formatNewDataPoints, createNewInstitutionData } from './helpers';

import { IUser, IInstitutionSavingsPoint } from './../types';

const User = mongoose.model('User');
const savingsRouter = express.Router();

savingsRouter.use(
	bodyParser.urlencoded({
		extended: false
	})
);

savingsRouter.use(bodyParser.json());

savingsRouter.get('/data', async (req, res) => {

	const institutionId = req.query.id;
	const userId = req.session.user._id;

	let savings: IInstitutionSavingsPoint[];

	try {

		const userData: IUser = await User.findOne({ _id: userId });
		const history = userData.savings;
		const institutionInfo = history.find(institution => institution.institutionId === institutionId);

		savings = institutionInfo.savingsData;

	} catch (error) {

		savings = [];

	}

	res.json(savings);

});

savingsRouter.post('/data', async (req, res) => {

	try {

		const data = req.body;
		const userId = req.session.user._id;
		const userInfo: IUser = await User.findOne({ _id: req.session.user._id });
		const oldInstitutionSavingsInfo = userInfo.savings;

		const newInstitutionSavingsInfo = formatNewDataPoints(data);
		const updatedInstitutionData = createNewInstitutionData(newInstitutionSavingsInfo, oldInstitutionSavingsInfo);

		let index: number;
		let found = false;

		for (let i = 0; i < oldInstitutionSavingsInfo.length; i++) {
			if (oldInstitutionSavingsInfo[i].institutionId === req.body.institutionId) {
				index = i;
				found = true;
				break;
			}
		}

		if (found) {

			const updatedSavings = [
				...oldInstitutionSavingsInfo.slice(0, index),
				updatedInstitutionData,
				...oldInstitutionSavingsInfo.slice(index + 1)
			];

			await User.updateOne({ _id: userId }, { savings: updatedSavings });

		}

		res.status(200);

	} catch (error) {

		res.status(500);

	}

});

export default savingsRouter;
