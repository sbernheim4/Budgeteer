import mongoose from 'mongoose';
import chalk from 'chalk';

import './models';

async function startDB() {

	try {

		await mongoose.connect(
			process.env.DB_URI,
			{ useNewUrlParser: true }
		);

		console.log(chalk.blue('MongoDB connection opened!'));

	} catch (error) {

		return error;

	}

}

export default startDB;
