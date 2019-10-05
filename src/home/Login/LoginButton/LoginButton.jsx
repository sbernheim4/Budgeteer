import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toTitleCase } from '../../../budgeteer/helpers.js';

import './LoginButton.scss';

class LoginButton extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		const hrefURL = `${process.env.DEV_BASE_URL}/login/${this.props.company}`;
		const className = `login-btn login-btn__${this.props.company}`;

		const text = this.props.text || `Login with ${toTitleCase(this.props.company)}`

		return (
			<a className={className} href={hrefURL}>
				<FontAwesomeIcon
					className='icon'
					icon={this.props.logo}
				/>
				<p>{text}</p>
			</a>
		);
	}
}

export default LoginButton;
