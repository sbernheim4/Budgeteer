require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const chalk = require("chalk");
const compression = require('compression');
const mongoose = require('mongoose');
const startDb = require('./db');
const fs = require('fs');
const https = require('https');
const http = require('http');
const util = require('util');
const bodyParser = require('body-parser')

const options = {
	key: fs.readFileSync('encryption/server.key'),
	cert: fs.readFileSync('encryption/server.crt'),
	ca: fs.readFileSync('encryption/server.csr')
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

/****************** DB Options ******************/
const mongodbUri = process.env.DB_URI;

mongoose.connect(mongodbUri);
let db = mongoose.connection;

/****************** Server Options ******************/
const port = process.env.PORT;
const insecurePort = process.env.INSECURE_PORT;
const cacheTime = 172800000; // 2 Days

app.use(compression());

app.all("*", (req, res, next) => {
	console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
    console.log('--------------------------------------------------------------------------');

	next();
});
/****************** SERVE STATIC FILES --> JS, CSS, IMAGES ETC ******************/
app.use(express.static(path.join(__dirname, "../public"), { maxAge: cacheTime } ));

/****************** Handle Requests ******************/

app.use("/plaid-api", require("./plaid-api.js"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/home-page.html"));
});

app.get("/budgeteer", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/budgeteer.html"));
});

app.get("/budgeteer/sw.js", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/sw.js"));
});

app.get("/budgeteer/loading-gifs/loading-one.gif", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/loading-gifs/loading-one.gif"));
});

app.get("/budgeteer/loading-gifs/loading-three.gif", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/loading-gifs/loading-three.gif"));
});

app.get("/budgeteer/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/budgeteer.html"));
});

/****************** Start the DB and Server ******************/

if (process.env.NODE_ENV === "development") {
	startDb.then(() => {
		https.createServer(options, app).listen(port);
		http.createServer(app).listen(insecurePort);
		console.log(chalk.green(`Listening securely on port ${port}`));
		console.log(chalk.green(`Listening insecurely on port ${insecurePort}`))
	}).catch(err => {
		console.log(err);
	});
} else if (process.env.NODE_ENV === "production") {

	startDb.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Listening on port ${port}`));
		});

	}).catch(err => {
		console.log(err);
	});
}

