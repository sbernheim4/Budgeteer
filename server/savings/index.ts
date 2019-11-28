
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import IUser from './../db/interfaces/IUser';

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
		console.log("DB Update Successful");

	} catch (error) {

		console.log("Error Caught");
		console.log(error);

	}

});

savingsRouter.get('/data', async (req, res) => {

	const userId = req.session.user._id;
	let savings: Array<object>;

	try {

		const userData: IUser = await User.findOne({ _id: userId });
		savings = userData.savings;

	} catch (error) {

		savings= [];

	}

	res.json(savings);

});

export default savingsRouter;
