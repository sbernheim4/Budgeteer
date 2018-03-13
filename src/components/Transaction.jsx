/*eslint no-undefined: 0*/

import React, { Component } from "react";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import {
	faSearch,
	faTags,
	faCalendar,
	faUtensils,
	faPlane,
	faShoppingBag,
	faWrench,
	faUsers,
	faMedkit,
	faPercent,
	faMoneyBillAlt,
	faExchangeAlt
} from '@fortawesome/fontawesome-free-solid';


import helpers from './helpers';

import "../scss/transaction.scss";

class Transaction extends Component {
	constructor(props) {
		super(props);

		this.state = {
			months: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
		};

		this.showMap = this.showMap.bind(this);
	}

	formatDate(date) {
		let monthNumber = parseInt(date.slice(date.indexOf("-") + 1, date.indexOf("-") + 3));
		let day = date.slice(date.length - 3, date.length - 1);
		let year = date.slice(1, 5);

		return this.state.months[monthNumber - 1] + " " + day + " '" + year.slice(2,);
	}

	showMap(e) {
		let iframe = document.createElement("iframe");
		console.log(e.target);

		// TODO: Currently hardcoding latitude and longitude but it should come from:
		// this.props.transaction.location.lat
		// this.props.transaction.location.lon
		/*iframe.src = "https://www.google.com/maps/embed/v1/place?q=40.7828647,-73.9653551&key=AIzaSyAUsLmC72g_Z2FhkgrmgMgFbjdIx8YDPPA&zoom=15"*/

		// WITH API KEY
		// "https://www.google.com/maps/embed/v1/place?q=40.7829,73.9654&key=AIzaSyAUsLmC72g_Z2FhkgrmgMgFbjdIx8YDPPA&zoom=15"

		// WITHOUT API KEY
		if (this.props.transaction.location.lat !== null && this.props.transaction.location.lon !== null) {
			iframe.src = `https://maps.google.com/maps?q=${this.props.transaction.location.lat},${this.props.transaction.location.lon}&z=15&output=embed`
		} else {
			iframe.src = "https://maps.google.com/maps?q=40.7828647,-73.9653551&z=15&output=embed"
		}


		if (!!e.target.querySelector("iframe")) {
			document.querySelectorAll(".transaction--map").forEach(val => { val.classList.remove("transaction--map") });

			// Being opened
			setTimeout(() => {
				document.querySelectorAll("iframe").forEach(val => { val.remove() });
			}, 301);
		} else {
			// closing
			document.querySelectorAll(".transaction--map").forEach(val => { val.classList.remove("transaction--map") });


			e.target.classList.toggle("transaction--map");
			e.target.appendChild(iframe);
		}

	}

	render() {
		let date = this.formatDate(JSON.stringify(this.props.transaction.date));
		let amount = helpers.formatAmount(this.props.transaction.amount);

		let googleMap = "";
		// The below URL doesn't require an API key, might be better
		// let srcString = "https://maps.google.com/maps?q=" + this.props.location.lon + "," + this.props.location.lat + "&z=15&output=embed"
		let category;

		if (this.props.transaction.category !== null && this.props.transaction.category !== undefined) {
			category = this.props.transaction.category[0];
		} else {
			category = "Null";
		}

		// Determine what icon to show on the left side
		let categoryIcon;
		switch(category) {
			case "Food and Drink":
				categoryIcon = faUtensils;
				break;
			case "Travel":
				categoryIcon = faPlane;
				break;
			case "Shops":
				categoryIcon = faShoppingBag;
				break;
			// case "Recreation":
			// 	categoryIcon = faUtensils;
			// 	break;
			case "Service":
				categoryIcon = faWrench;
				break;
			case "Community":
				categoryIcon = faUsers;
				break;
			case "Healthcare":
				categoryIcon = faMedkit;
				break;
			// case "Bank Fees":
			// 	categoryIcon = faUtensils;
			// 	break;
			// case "Cash Advance":
			// 	categoryIcon = faUtensils;
			// 	break;
			case "Interest":
				categoryIcon = faPercent;
				break;
			case "Payment":
				categoryIcon = faMoneyBillAlt;
				break;
			// case "Tax":
			// 	categoryIcon = faPlane;
			// 	break;
			case "Transfer":
				categoryIcon = faExchangeAlt;
				break;
			default:
				categoryIcon = faUtensils;
		}

		// Should the color of the amount be red or green based based on purchase or withdrawl
		let amtColor = 'amount--amt';
		if (this.props.transaction.amount * -1 > 0) {
			amtColor = 'amount--amt__green';
		}


		return (
			<div className='transaction' onClick={this.showMap}>

				<div className='container'>
					<FontAwesomeIcon className="icon" icon={categoryIcon} />

					<div className='name-info'>
						<p className='name-info--name'>{this.props.transaction.name}</p>
						<p className='name-info--category'>{category}</p>
					</div>

					<div className='amount'>
						<p className={amtColor}> ${this.props.transaction.amount * -1}</p>
						<p className='amount--date'>{date}</p>
					</div>

				</div>
			</div>
		);
	}
}

export default Transaction;
/*<div className="transaction" onClick={this.showMap}>
				<h4>{JSON.parse(JSON.stringify(this.props.transaction.name))}</h4>
				<p>${amount}</p>
				<p>{date}</p>
			</div>*/
