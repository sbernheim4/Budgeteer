import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { IUser, IBankInfo, IInstitutionSavingsPoint, IInstitutionSavingsInfo } from './../types';

const User = mongoose.model('User');
const savingsRouter = express.Router();

savingsRouter.use(
	bodyParser.urlencoded({
		extended: false
	})
);

savingsRouter.use(bodyParser.json());

savingsRouter.post('/data', async (req, res) => {

	const data = req.body;
	const userId = req.session.user._id;
	const userInfo: IUser = await User.findOne({ _id: req.session.user._id });
	const savings = userInfo.savings;

	try {

		const newDataPoints = formatNewDataPoints(data);
		const updatedInstitutionSavingsInfo = createNewInstitutionSavingsInfo(newDataPoints, savings);

		await User.updateOne({ _id: userId }, { savings: updatedInstitutionSavingsInfo });

		res.status(200);

	} catch (error) {

		res.status(500);

	}

});

function formatNewDataPoints(data: IBankInfo[]) {

	const dateString = new Date().toString();

	const savingsInfo = data.map(institution => {

		const { institutionId, institutionBalance } = institution;

		const newInfo: IInstitutionSavingsInfo = {
			institutionId,
			savingsData: [{
				date: dateString,
				institutionalBalance: institutionBalance
			}]
		};

		return newInfo;

	});

	return savingsInfo;

}

function createNewInstitutionSavingsInfo(newDataPoints: IInstitutionSavingsInfo[], savings: IInstitutionSavingsInfo[]) {

	const updatedInstitutionInfo = newDataPoints.map(dataPoint => {

		const { institutionId, savingsData } = dataPoint;

		const currInstitution = savings.find(institution => institution.institutionId === institutionId);
		let newDataPointsArray = [];

		try {

			const oldDataPoints = currInstitution.savingsData;

			oldDataPoints.sort((a, b) => {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			});

			newDataPointsArray = [...savingsData, ...oldDataPoints];

		} catch (error) {

			newDataPointsArray = [...savingsData];

		}

		const updatedInstitutionInfo: IInstitutionSavingsInfo = {
			institutionId,
			savingsData: newDataPointsArray
		}

		return updatedInstitutionInfo;

	});

	return updatedInstitutionInfo;

}

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
