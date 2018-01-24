import React, { Component } from "react";

import helpers from './helpers';

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

		return this.state.months[monthNumber - 1] + " " + day + " " + year;
	}

	render() {
		let date = this.formatDate(JSON.stringify(this.props.transaction.date));
        let amount = helpers.formatAmount(this.props.transaction.amount);

        // The below URL doesn't require an API key, might be better 
        // let srcString = "https://maps.google.com/maps?q=" + this.props.location.lon + "," + this.props.location.lat + "&z=15&output=embed"
        let srcString = "https://www.google.com/maps/embed/v1/place?q=" + this.props.location.lon + "," + this.props.location.lat + "&amp;key=AIzaSyAUsLmC72g_Z2FhkgrmgMgFbjdIx8YDPPA&zoom=15"
		return (
			<div className="transaction">
				<h4>{JSON.parse(JSON.stringify(this.props.transaction.name))}</h4>
				<p>${amount}</p>
				<p>{date}</p>
                <iframe src={srcString}> </iframe>

			</div>
		);
	}
}

export default Transaction;
