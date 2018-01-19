import React, { Component } from "react";
import helpers from "./helpers.js";

class Networth extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		return <h1>Net Worth ${this.props.netWorth}</h1>;
	}
}

export default Networth
