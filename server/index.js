require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const chalk = require("chalk");
const compression = require('compression');
const mongoose = require('mongoose');
const startDb = require('./db');


/****************** DB Options ******************/
const mongodbUri = process.env.DB_URI;

mongoose.connect(mongodbUri);
let db = mongoose.connection;

/****************** Server Options ******************/
const port = process.env.PORT;
const cacheTime = 31536000000;

app.use(compression());

/****************** SERVE STATIC FILES --> JS, CSS, IMAGES ETC ******************/
app.use(express.static(path.join(__dirname, "../public"), { maxAge: cacheTime } ));

/****************** Handle Requests ******************/
app.use("/plaid-api", require("./plaid-api.js"));

app.all("*", (req, res, next) => {
	console.log(chalk.blue(`New ${req.method} request for ${req.path} on ${new Date().toLocaleString()}`));
    next();
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

/****************** Start the DB and Server ******************/
startDb.then( () => {
    app.listen(port, () => {
        console.log(chalk.blue(`Listening on port ${port}`));
    });
}).catch(err => {
    console.log(err);
})




