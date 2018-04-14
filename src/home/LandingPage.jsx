import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import "./scss/landing-page.scss";

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		return (
			<div className="landing-page">
				<a href="/budgeteer">Take me to Budgeteer</a>
				<p>blah</p>
			</div>
		);
	}
}

export default LandingPage;
