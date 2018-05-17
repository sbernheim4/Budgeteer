import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from "./Navbar/Navbar.jsx";

import LandingPage from "./LandingPage/LandingPage.jsx";

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
				<LandingPage />
			</div>
		);
	}
}

export default App;
