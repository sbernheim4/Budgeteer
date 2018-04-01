import React, { Component } from "react";

import '../scss/home.scss';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		let text;

		if (this.props.loading) {
			text = <img src='./loading-gifs/loading-one.gif' alt='loading' />
		} else {
			text = <h1>Welcome</h1>;
		}

		return (
			<div className="home">
				{text}
			</div>
		);
	}
}

export default Home;
