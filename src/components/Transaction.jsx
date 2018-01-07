import React, { Component } from "react";

import "../scss/transaction.scss";

class Transaction extends Component {
	constructor(props) {
		super(props)
		this.state = {
			months: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
		};
	}

	formatDate(date) {
		let monthNumber = parseInt(date.slice(date.indexOf("-") + 1, date.indexOf("-") + 3));
		let day = date.slice(date.length - 3, date.length - 1);
		let year = date.slice(1, 5);

		return this.state.months[monthNumber-1] + " " + day + " " + year;
	}

	formatAmount(amt) {
		return (Math.round(amt * 100) / 100).toFixed(2);
	}

	render() {
		let date = this.formatDate(JSON.stringify(this.props.transaction.date));
		let amount = this.formatAmount(this.props.transaction.amount);

		return (
			<div className="transaction">
				<h4>{JSON.parse(JSON.stringify(this.props.transaction.name))}</h4>
				<p>${amount}</p>
				<p>{date}</p>
			</div>
		);
	}
}


export default Transaction;
