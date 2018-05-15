import React, { Component } from "react";

import './errorMessage.scss';

class ErrorMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		// Hide compoent after 5.5 seconds of displaying the error message
		if (this.props.display) {
			setTimeout(() => {
				document.querySelector(".error").classList.add("hide");
			}, 5500);
		}
	}


	render() {
		if (this.props.display) {
			return <div className="error">{this.props.text}</div>;
		} else {
			return '';
		}

	}
}

export default ErrorMessage;
