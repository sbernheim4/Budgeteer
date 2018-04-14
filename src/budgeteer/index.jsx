import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom';

import "./scss/reset.scss";

/* App is the entry point to the React code.*/
import App from './App.jsx';

ReactDOM.render(
	<BrowserRouter basename="/budgeteer">
		<App />
	</BrowserRouter>
	,document.getElementById("root")
);
