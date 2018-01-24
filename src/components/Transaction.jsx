import React, { Component } from "react";

import helpers from './helpers';

import "../scss/transaction.scss";

class Transaction extends Component {
	constructor(props) {
		super(props)
		this.state = {
			months: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
        };

        this.showMap = this.showMap.bind(this);
	}

	formatDate(date) {
		let monthNumber = parseInt(date.slice(date.indexOf("-") + 1, date.indexOf("-") + 3));
		let day = date.slice(date.length - 3, date.length - 1);
		let year = date.slice(1, 5);

		return this.state.months[monthNumber - 1] + " " + day + " " + year;
    }

    showMap(e) {
        console.log(e.target);

        e.target.classList.toggle("transaction--map");
        let iframe = document.createElement("iframe");

        // TODO: Currently hardcoding latitude and longitude but it should come from:
        // this.props.transaction.location.lat
        // this.props.transaction.location.lon
        iframe.src = "https://www.google.com/maps/embed/v1/place?q=40.7828647,-73.9653551&key=AIzaSyAUsLmC72g_Z2FhkgrmgMgFbjdIx8YDPPA&zoom=15"

        // WITH API KEY
        // "https://www.google.com/maps/embed/v1/place?q=40.7829,73.9654&key=AIzaSyAUsLmC72g_Z2FhkgrmgMgFbjdIx8YDPPA&zoom=15"

        // WITHOUT API KEY
        // iframe.src = "https://maps.google.com/maps?q=40.7829,73.9654&z=15&output=embed"

        if (!!e.target.querySelector("iframe")) {
            document.querySelectorAll("iframe").forEach(val => { val.remove() })
            console.log("removing iframe");
        } else {
            e.target.appendChild(iframe);
            console.log("Adding iframe");
        }
    }

	render() {
		let date = this.formatDate(JSON.stringify(this.props.transaction.date));
        let amount = helpers.formatAmount(this.props.transaction.amount);

        let googleMap = "";
        // The below URL doesn't require an API key, might be better
        // let srcString = "https://maps.google.com/maps?q=" + this.props.location.lon + "," + this.props.location.lat + "&z=15&output=embed"

        return (
            <div className="transaction" onClick={this.showMap}>
				<h4>{JSON.parse(JSON.stringify(this.props.transaction.name))}</h4>
				<p>${amount}</p>
				<p>{date}</p>
			</div>
		);
	}
}


export default Transaction;
