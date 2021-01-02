import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { formatNewDataPoints, createNewInstitutionData } from './helpers';

import {
    User as IUser,
    InstitutionSavingsPoint,
    InstitutionSavingsInfo,
    BankInfo
} from './../types';

const User = mongoose.model('User');
const savingsRouter = express.Router();

savingsRouter.use(
	bodyParser.urlencoded({
		extended: false
	})
);

savingsRouter.use(bodyParser.json());

savingsRouter.get('/data', async (req, res) => {

	const institutionId = req.query.id as string;
	const userId = req.session.user._id;

	let history: InstitutionSavingsInfo[];
	let savings: InstitutionSavingsPoint[];

	try {

		const userData: IUser = await User.findOne({ _id: userId });
		history = userData.savings;
		const institutionInfo = history.find(institution => institution.institutionId === institutionId);

		savings = institutionInfo.savingsData;

	} catch (error) {

		const inititalInstitutionSavingsData: InstitutionSavingsInfo = {
			institutionId,
			savingsData: []
		};

		const updatedSavings = [
			...history,
			inititalInstitutionSavingsData
		];

		await User.updateOne({ _id: userId }, { savings: updatedSavings });

		savings = inititalInstitutionSavingsData.savingsData;

	}

	res.json(savings);

});

savingsRouter.post('/data', async (req, res) => {

	try {

		const data: BankInfo = req.body;
		const userId = req.session.user._id;
		const userInfo: IUser = await User.findOne({ _id: req.session.user._id });
		const savingsArray = userInfo.savings;
		const oldInstitutionSavingsInfo = savingsArray.find(institutionSavingsInfo => institutionSavingsInfo.institutionId === data.institutionId);

		const newInstitutionSavingsInfo = formatNewDataPoints(data);
		const updatedInstitutionData = createNewInstitutionData(oldInstitutionSavingsInfo, newInstitutionSavingsInfo);

		let index: number;
		let found = false;

		for (let i = 0; i < savingsArray.length; i++) {
			if (savingsArray[i].institutionId === req.body.institutionId) {
				index = i;
				found = true;
				break;
			}
		}

		if (found) {

			const updatedSavings = [
				...savingsArray.slice(0, index),
				updatedInstitutionData,
				...savingsArray.slice(index + 1)
			];

			await User.updateOne({ _id: userId }, { savings: updatedSavings });

		}

		res.status(200).send();

	} catch (error) {

		res.status(500).send();

	}

});

export default savingsRouter;
