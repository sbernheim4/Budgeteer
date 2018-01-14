import React, { Component } from "react";
import helpers from "./helpers.js";

class Networth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			netWorth: "calculating..."
		}
	}

	componentWillMount() {
		this.getNetWorth();
	}

	getNetWorth() {
		fetch("/plaid-api/balance", {
			method: "post"
		}).then(data => {
			return data.json();
		}).then(data => {

			// Normalize net worth by keeping only 2 decimals and adding commas
			let normalizedNetWorth = helpers.formatAmount(data.netWorth);
			normalizedNetWorth = helpers.numberWithCommas(normalizedNetWorth);

			this.setState({ netWorth: "$" + normalizedNetWorth });
		}).catch(err => {
			console.error(err);
		});
	}

	render () {
		return <h1>Net Worth {this.state.netWorth}</h1>;
	}
}

export default Networth
