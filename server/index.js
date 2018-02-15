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

const options = {
    key: fs.readFileSync('encryption/server.key'),
    cert: fs.readFileSync('encryption/server.crt'),
    ca: fs.readFileSync('encryption/server.csr')
};

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

app.get("/*", (req, res) => {
    res.redirect('/');
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

/****************** Start the DB and Server ******************/

if (process.env.NODE_ENV === "development") {
    startDb.then(() => {
        https.createServer(options, app).listen(port);
        console.log(chalk.green(`Listening on port ${port}`));
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

