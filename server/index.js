'use strict'

require('dotenv').config();

const express = require(`express`);
const app = express();
const path = require('path');
const chalk = require('chalk');

const port = process.env.PORT;
const cacheTime = 31536000000;

/******************  SERVE STATIC FILES --> JS, CSS, IMAGES ETC ******************/
app.use(express.static(path.join(__dirname, '../public'), { maxAge: cacheTime } ));

app.use('/plaid-api', require('./plaid-api.js'));

app.all('*', (req, res, next) => {
	console.log(chalk.blue(`New ${req.method} request for ${req.path} on ${new Date().toLocaleString()}`));
	next();
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
	console.log(chalk.green(`Listening on port ${port}`));
});
