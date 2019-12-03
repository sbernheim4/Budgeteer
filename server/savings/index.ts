import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { formatNewDataPoints, createNewInstitutionSavingsInfo } from './helpers';

import { IUser, IInstitutionSavingsPoint } from './../types';

const User = mongoose.model('User');
const savingsRouter = express.Router();

savingsRouter.use(
	bodyParser.urlencoded({
		extended: false
	})
);

savingsRouter.use(bodyParser.json());

savingsRouter.post('/data', async (req, res) => {

	try {

		const data = req.body;
		const userId = req.session.user._id;
		const userInfo: IUser = await User.findOne({ _id: req.session.user._id });
		const oldInstitutionSavingsInfo = userInfo.savings;

		const newInstitutionSavingsInfo = formatNewDataPoints(data);
		const updatedInstitutionSavingsInfo = createNewInstitutionSavingsInfo(newInstitutionSavingsInfo, oldInstitutionSavingsInfo);

		await User.updateOne({ _id: userId }, { savings: updatedInstitutionSavingsInfo });

		res.status(200);

	} catch (error) {

		res.status(500);

	}

});

savingsRouter.get('/data', async (req, res) => {

	const institutionId = req.query.id;
	const userId = req.session.user._id;

	let savings: IInstitutionSavingsPoint[];

	try {

		const userData: IUser = await User.findOne({ _id: userId });
		const history = userData.savings;
		const institutionInfo = history.find(institution => institution.institutionId === institutionId);

		savings = institutionInfo.savingsData;

		res.json(savings);

	} catch (error) {

		savings = [];

	}

});

export default savingsRouter;
