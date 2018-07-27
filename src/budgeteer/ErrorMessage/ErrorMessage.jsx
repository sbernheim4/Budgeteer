import React, { Component } from "react";

import './errorMessage.scss';

class ErrorMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			display: this.props.display
		};
	}

	componentDidMount() {
		// Timeout the error message after 5.5 seconds
		setTimeout(() => {
			this.setState({
				display: false
			})
		}, 5500);
	}

	render() {
		if (this.state.display) {
			return <div className="error"><h2>{this.props.text}</h2></div>;
		} else {
			return '';
		}
	}
}

export default ErrorMessage;
