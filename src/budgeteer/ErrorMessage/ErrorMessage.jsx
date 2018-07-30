import React, { Component } from "react";

import './errorMessage.scss';

const green = {
	background: 'rgb(70, 145, 107)',
};

const red = {
	background: 'rgb(216, 69, 69)'
}

class ErrorMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			display: this.props.display
		};

	}

	static getDerivedStateFromProps(props, state) {

		return {
			display: props.display,
			color: props.color === "green" ? green : red
		}
	}

	render() {
		if (this.state.display) {
			return (
				<div style={this.state.color} className="error">
					<h2>{this.props.text}</h2>
				</div>
			);
		} else {
			return '';
		}
	}
}

export default ErrorMessage;
