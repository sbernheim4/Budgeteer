import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from 'react-router-dom';

import "./scss/reset.scss";

/* App is the entry point to the React code.*/
import App from './App.jsx';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("home")
);
