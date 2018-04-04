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
			text = <div><h1>Loading...</h1><img src='./loading-gifs/loading-one.gif' alt='loading' /></div>
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
