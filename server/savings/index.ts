import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { IUser, IBankInfo, IInstitutionSavingsPoint } from './../types';

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

	const newDataPoints = data.map((institution: IBankInfo) => {

		const { institutionId, institutionBalance, institutionBalanceObject } = institution;

		const savingsData = {
			date: new Date(),
			institutionBalance,
			institutionBalanceMap: institutionBalanceObject
		};

		return {
			institutionId,
			savingsData
		};

	}).sort((a, b) => {
		return a.institutionId - b.institutionId
	});

	try {
		await User.updateOne({ _id: userId }, { savings: updatedHistoricalData });
	} catch (error) {
		console.log(error);
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
