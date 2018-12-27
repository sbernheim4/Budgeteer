import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toTitleCase } from '../../../budgeteer/helpers.js';

import "./LoginButton.scss";

class LoginButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const hrefURL = '/login/' + this.props.company;
		const className = 'login-btn login-btn__' + this.props.company;

		return (
			<div className={className}>
				<p><a href={hrefURL}> <FontAwesomeIcon className='icon' icon={this.props.logo} />Login with {toTitleCase(this.props.company)}</a></p>
			</div>
		);
	}
}

export default LoginButton;
