import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar.jsx';
import LandingPage from './LandingPage/LandingPage.jsx';
import Login from './Login/Login.jsx';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		if (window.location.protocol !== 'https:') {
			if (window.location.port) {
				window.location.href = `https://${window.location.host.slice(0, -4)}5000${window.location.pathname}`;
			} else {
				window.location.href = `https://${window.location.host}${window.location.pathname}`;
			}
		}
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
