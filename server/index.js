"use strict";
/* eslint no-undefined: "off" */
exports.__esModule = true;
require("dotenv").config();
var fs = require("fs");
var path = require("path");
//import * as util from 'util';
var https = require("https");
var express_1 = require("express");
var compression_1 = require("compression");
var mongoose = require("mongoose");
var helmet_1 = require("helmet");
var bodyParser = require("body-parser");
//import * as mongo from 'connect-mongo';
var express_session_1 = require("express-session");
var passport = require("passport");
//import startDb from './db/';
//const MongoStore = mongo(session)
var app = express_1["default"]();
/****************** DB Options ******************/
var mongodbUri = process.env.DB_URI;
mongoose.connect(mongodbUri, { useNewUrlParser: true });
// If you have set `DB_URI` env var in your `.env` file then use that DB to store sessions
if (process.env.DB_URI) {
    app.use(express_session_1["default"]({
        secret: 'jfadhsnfijhu]0i32iekn245u280ur32U0JFL2342fdsaANSL',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
    }));
}
else {
    app.use(express_session_1["default"]({
        secret: 'jfadhsnfijhu]0i32iekn245u280ur32U0JFL2342fdsaANSL',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
    }));
}
var options = {
    key: fs.readFileSync(path.join(__dirname, './encryption/server.key')),
    cert: fs.readFileSync(path.join(__dirname, './encryption/server.crt')),
    ca: fs.readFileSync(path.join(__dirname, './encryption/server.csr'))
};
/****************** Server Options ******************/
var cacheTime = 172800000; // 2 Days
app.use(helmet_1["default"]()); // Sets some good default headers
app.use(compression_1["default"]()); // Enables gzip compression
app.use(bodyParser.json()); // Lets express handle JSON encoded data sent on the body of requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
/****************** Serve Static Files --> JS, CSS, Images  ******************/
app.use(express_1["default"].static(path.join(__dirname, '../static-assets'), { maxAge: cacheTime }));
app.use(express_1["default"].static(path.join(__dirname, '../public'), { maxAge: cacheTime }));
/****************** Log Requests ******************/
/*app.use('*', (req, res, next) => {
    console.log('--------------------------------------------------------------------------');
    console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
    next();
});*/
/****************** Handle Requests ******************/
app.use('/legal', require('./legal.js'));
app.use('/plaid-api', checkAuthentication, require('./plaid-api.js'));
//app.use('/user-info', checkAuthentication, require('./user-info.js'));
app.get('/', function (_req, res) {
    res.sendFile(path.join(__dirname, '../public/home.html'));
});
//app.use('/login', require("./auth.js"));
// TODO: For some reason this is needed. Visiting budgeteer.org makes a request for /budgeteer/budgeteer.js instead of just /budgeteer.js
app.get('/budgeteer/*.js', checkAuthentication, function (_req, res) {
    res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});
app.get('/budgeteer', checkAuthentication, function (_req, res) {
    res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});
app.get('/budgeteer/*', checkAuthentication, function (_req, res) {
    res.sendFile(path.join(__dirname, '../public/budgeteer.html'));
});
app.get("*", function (_req, res) {
    res.status(404).send("<h1>404 Page Not Found</h1>");
});
function checkAuthentication(req, res, next) {
    // Check if the user variable on the session is set. If not redirect to /login
    // otherwise carry on (https://www.youtube.com/watch?v=2X_2IdybTV0)
    if (req.session.user !== undefined) {
        // User is authenticated :)
        next();
    }
    else {
        // User is not authenticated :(
        // If the user tried to go straight to /budgeteer/transactions without being
        // logged in store the route they tried to visit in the session to redirect
        // them too after authentication completes
        req.session.returnUrl = req.url;
        req.session.save(function () { });
        res.redirect('/login');
    }
}
/****************** Start the DB and Server ******************/
if (process.env.DB_URI && process.env.DB_URI !== '') {
    startServer();
    //startDb.then(() => {
    //startServer();
    //}).catch(err => {
    //console.log(err);
    //})
}
else {
    console.log('process.env.DB_URI is undefined (this should be set in your .env file).\nSkipping opening connection to DB.\nSessions are being stored in memory');
    startServer();
}
function startServer() {
    https.createServer(options, app).listen(process.env.PORT);
    console.log("App is live on " + process.env.DEV_BASE_URL);
}
