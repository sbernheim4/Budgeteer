import React, { Component } from "react";
import { Link } from 'react-router-dom';

import axios from 'axios';

import "./login.scss";

import FacebookLoginButton from "react-social-login-buttons/lib/buttons/FacebookLoginButton";
import GoogleLoginButton from "react-social-login-buttons/lib/buttons/GoogleLoginButton";

class Navbar extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	async componentDidMount() {

	}

	loginWithFacebook() {
		axios.get("/login/facebook");
	}

	render() {
		return (
			<div className="login">
				<div className="login__buttons">
					<a href="/login/facebook"><FacebookLoginButton /></a>
					<a href="/login/google"><GoogleLoginButton /></a>
				</div>
			</div>
		);
	}
}

export default Navbar;
