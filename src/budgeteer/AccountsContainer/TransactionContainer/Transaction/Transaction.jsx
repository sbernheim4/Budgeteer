/*eslint no-undefined: 0*/

import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTape,
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
	faExchangeAlt,
	faQuestion
} from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import Swipe from 'react-easy-swipe';

import { jsonToMap, numberWithCommas, formatAmount, toTitleCase } from '../../../helpers';

import "./transaction.scss";

class Transaction extends Component {
	constructor(props) {
		super(props);

		this.state = {
			months: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
			displayNames: new Map()
		};

		this.showMap = this.showMap.bind(this);
		this.getAccountNameFromID = this.getAccountNameFromID.bind(this);
		this.onSwipeRight = this.onSwipeRight.bind(this);
	}

	async componentDidMount() {

		try {
			let displayNames = await axios.get("/user-info/display-names");
			displayNames = displayNames.data;
			const map = jsonToMap(displayNames);

			this.setState({
				displayNames: map
			});
		} catch(err) {
			console.log("ERROR");
			console.log(err);
		}
	}

	formatDate(date) {
		let monthNumber = parseInt(date.slice(date.indexOf("-") + 1, date.indexOf("-") + 3));
		let day = date.slice(date.length - 3, date.length - 1);
		let year = date.slice(1, 5);

		return this.state.months[monthNumber - 1] + " " + day + " '" + year.slice(2,);
	}

	showMap(e) {
		e.persist()
		let iframe = document.createElement("iframe");

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

		// this.closeAllIFrames();
		let containsIFrame = !!e.target.querySelector("iframe");

		if (!containsIFrame) {

			// close any other open iframes
			document.querySelectorAll(".transaction--map").forEach(val => {
				val.classList.remove("transaction--map");

				// Actually remove the iframe after the transition is done
				setTimeout(() => {
					val.removeChild(val.children[1]);
				}, 300);
			});

			// open selected iframe
			e.target.appendChild(iframe);
			e.target.classList.toggle("transaction--map");
		} else {
			// remove the iframe from the element
			e.target.classList.remove("transaction--map");

			// Actually remove the iframe after the transition is done
			setTimeout(() => {
				e.target.removeChild(e.target.children[1]);
			}, 300)
		}
	}

	getAccountDisplayName(accountID, defaultName) {
		let x = this.state.displayNames;
		if (x === undefined) return defaultName;

		return x.get(accountID) || defaultName;
	}

	getAccountNameFromID(accountID) {
		let x = this.state.displayNames;
		let defaultName;

		for (let acct of this.props.accounts) {
			if (acct.account_id === accountID) {
				defaultName = acct.name;
			}
		}

		return x.get(accountID) || defaultName;
	}

	getCategoryIcon(categoryName) {
		// Determine what icon to show on the left side

		let categoryIcon;

		switch(categoryName) {
			case "Food and Drink":
				categoryIcon = faUtensils;
				break;
			case "Travel":
				categoryIcon = faPlane;
				break;
			case "Shops":
				categoryIcon = faShoppingBag;
				break;
			 case "Recreation":
				 categoryIcon = faTape;
				 break;
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
			// 	categoryIcon = ;
			// 	break;
			// case "Cash Advance":
			// 	categoryIcon = ;
			// 	break;
			case "Interest":
				categoryIcon = faPercent;
				break;
			case "Payment":
				categoryIcon = faMoneyBillAlt;
				break;
			// case "Tax":
			// 	categoryIcon = ;
			// 	break;
			case "Transfer":
				categoryIcon = faExchangeAlt;
				break;
			default:
				categoryIcon = faQuestion;
		}

		return categoryIcon;
	}

	onSwipeRight() {
		this.setState({
			active: true
		});
	}

	render() {

		const date = this.formatDate(JSON.stringify(this.props.transaction.date));
		const amount = formatAmount(this.props.transaction.amount);

		// The below URL doesn't require an API key, might be better
		// let srcString = "https://maps.google.com/maps?q=" + this.props.location.lon + "," + this.props.location.lat + "&z=15&output=embed"

		// Get the category of the transaction or Null if unknown
		let category = this.props.transaction.category !== null && this.props.transaction.category !== undefined ? this.props.transaction.category[0] : category = "Null";

		let amt = formatAmount(this.props.transaction.amount * -1);
		amt = "$" + numberWithCommas(amt);

		// Should the color for the amount be red or green based based on it being positive or negative
		const amtColor = this.props.transaction.amount > 0 ? 'amount--amt' : 'amount--amt__green';
		const name = toTitleCase(this.props.transaction.name)

		const containerClassName = this.state.active ? 'container active' : 'container';

		return (
			<div className='transaction' onClick={this.showMap}>
				<Swipe onSwipeRight={this.onSwipeRight}>
					<div className={containerClassName}>
						<FontAwesomeIcon className="icon" icon={this.getCategoryIcon(category)} />

						<div className='name-info'>
							<p className='name-info--name'>{name}</p>
							<p className='name-info--category'>{this.getAccountNameFromID(this.props.transaction.account_id)} <span>{this.props.transaction.pending === true ? '- Pending' : ''}</span></p>
						</div>

						<div className='amount'>
							<p className={amtColor}>{amt}</p>
							<p className='amount--date'>{date}</p>
						</div>
					</div>
				</Swipe>
			</div>
		);
	}
}

export default Transaction;
