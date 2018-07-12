import React, { Component } from "react";
import { Link } from 'react-router-dom';

import axios from 'axios';

import "./login.scss";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/fontawesome-free-brands'

import FacebookLoginButton from "react-social-login-buttons/lib/buttons/FacebookLoginButton";
import GoogleLoginButton from "react-social-login-buttons/lib/buttons/GoogleLoginButton";

// import {
// 	faFacebook,
// 	fab
// } from '@fortawesome/fontawesome-free-solid';

// import { 
// 	faFacebook,
// 	fab
// } from '@fortawesome/free-brands-svg-icons'

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
			<div>
				<p>Log in with Google or Facebook</p>
				<a href="/login/facebook"><FacebookLoginButton /></a>
				<a href="/login/google"><GoogleLoginButton /></a>
			</div>
		);
	}
}

export default Navbar;
