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

import { jsonToMap, numberWithCommas, formatAmount, toTitleCase } from '../../../helpers';

import "./transaction.scss";

class Transaction extends Component {
	constructor(props) {
		super(props);

		this.state = {
			months: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
		};

		this.getAccountNameFromID = this.getAccountNameFromID.bind(this);
	}

	formatDate(date) {
		let monthNumber = parseInt(date.slice(date.indexOf("-") + 1, date.indexOf("-") + 3));
		let day = date.slice(date.length - 3, date.length - 1);
		let year = date.slice(1, 5);

		return this.state.months[monthNumber - 1] + " " + day + " '" + year.slice(2,);
	}


	getAccountDisplayName(accountID, defaultName) {
		let x = this.props.displayNames;
		if (x === undefined) return defaultName;

		return x.get(accountID) || defaultName;
	}

	getAccountNameFromID(accountID) {
		let x = this.props.displayNames;
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

	render() {

		const date = this.formatDate(JSON.stringify(this.props.transaction.date));
		const amount = formatAmount(this.props.transaction.amount);

		// Get the category of the transaction or Null if unknown
		let category = this.props.transaction.category !== null && this.props.transaction.category !== undefined ? this.props.transaction.category[0] : category = "Null";

		let amt = formatAmount(this.props.transaction.amount * -1);
		amt = "$" + numberWithCommas(amt);

		// Should the color for the amount be red or green based based on it being positive or negative
		const amtColor = this.props.transaction.amount > 0 ? 'amount--amt' : 'amount--amt__green';
		const name = toTitleCase(this.props.transaction.name)

		return (
			<div className='transaction'>
				<div>
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
			</div>
		);
	}
}

export default Transaction;
