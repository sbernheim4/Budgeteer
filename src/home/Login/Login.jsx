import React, { Component } from 'react';
import LoginButton from './LoginButton/LoginButton.jsx';

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import './login.scss';

class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='login'>
				<div className='login__buttons'>
					<LoginButton text={"Continue with Facebook"} logo={faFacebook} company={'facebook'} />
					<LoginButton logo={faGoogle} company={'google'} />
				</div>
			</div>
		);
	}
}

export default Login;
