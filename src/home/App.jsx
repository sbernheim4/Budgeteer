import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from "./Navbar/Navbar.jsx";

import LandingPage from "./LandingPage/LandingPage.jsx";
import Login from "./Login/Login.jsx";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		return (
			<div>
				<Navbar />
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/login' component={Login} />
			</div>
		);
	}
}

export default App;
