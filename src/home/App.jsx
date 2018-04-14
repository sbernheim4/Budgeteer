import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from "./LandingPage.jsx";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		return (
			<div>
				<LandingPage />
			</div>
		);
	}
}

export default App;
