/* eslint no-undefined: 0 */
import axios from 'axios';

import ReactDOM from "react-dom";
import React, { Component } from "react";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import WeekSpendingChart from './WeekSpendingChart/WeekSpendingChart.jsx';
import TransactionContainer from "./TransactionContainer/TransactionContainer.jsx";

import "./accountsContainer.scss"

import { numberWithCommas, formatAmount, toTitleCase } from '../helpers';

// Font Awesome base package
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// Selective icons from Font Awesome
import {
	faRacquet,
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
	faUniversity
} from '@fortawesome/fontawesome-free-solid';

class AccountsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// this state variable is used to keep track of transactions the
			// user wants to see
			categoryTransactions: [],
			// Stores how the user is currently sorting their transactions
			categoryType: "",
			categoryTotal: 0.00,
			displayNames: {},
			keyWord: "",
			months : ["Jan.", "Feb.", "Mar.", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
		};

		this.getAccountTransactions = this.getAccountTransactions.bind(this);
		this.getCategoryTransactions = this.getCategoryTransactions.bind(this);
		this.getDate = this.getDate.bind(this);
		this.searchByDate = this.searchByDate.bind(this);
		this.searchByKeyword = this.searchByKeyword.bind(this);
		this.getKeyword = this.getKeyword.bind(this);
		this.getAccountDisplayName = this.getAccountDisplayName.bind(this);
	}

	async componentDidMount() {
		this.getAccountTransactions("all");
		let displayNames = await axios.get("/user-info/display-names");
		displayNames = displayNames.data;
		
		if (displayNames !== undefined) {
			this.setState({
				displayNames: displayNames
			});	
			console.log(displayNames);
		} else {
			console.log("displayNames was undefined");
		}
	}

	componentWillReceiveProps() {
		// On first load show all transactions by default for the user
		this.getAccountTransactions("all");
	}

	getAccountTransactions(account_id) {
		let releventTransactions = [];
		let type;
		let total = 0;

		if (account_id === "all") {
			releventTransactions = this.props.transactions;
			type = "All Categories";
		} else {
			this.props.transactions.map( (transaction) => {
				if (transaction.account_id === account_id) {
					releventTransactions.push(transaction);
				}
			});
		}

		releventTransactions.forEach((transaction) => {
			total += transaction.amount;
		});

		total = formatAmount(total);

		// Update the state with the relevent transactions and how the user is sorting them
		// Get the account name based on what the ID is ex: Checking Account, Savings Account, Credit Card etc.
		if (type === undefined) {
			this.props.accounts.forEach(account => {
				if (account.account_id === account_id) {
					type = account.name;
					return;
				}
			});
		}

		releventTransactions.sort((a, b) => {
			let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateOne - dateTwo;
		});

		//TODO: This can be cleaned up to not have two separate setState calls in the if statement

		if (type === "All Categories") {
			const now = new Date();

			const nowString = this.state.months[now.getMonth()] + "  " + now.getDate() + ".  " + now.getFullYear();
			const prevString = this.state.months[now.getMonth()] + "  " + now.getDate() + ".  " + (now.getFullYear() - 1);

			this.setState({
				categoryTransactions: releventTransactions,
				categoryType: prevString + " - " + nowString,
				categoryTotal: total
			});
		} else {
			this.setState({
				categoryTransactions: releventTransactions,
				categoryType: type,
				categoryTotal: total
			});
		}
	}

	getCategoryTransactions(categoryString) {

		let releventTransactions = [];

		// Other displays transactions with a category of null
		if (categoryString === "Other") {
			this.props.transactions.forEach(t => {
				if (t.category === null || t.category[0] === "Bank Fees" || t.category[0] === "Cash Advance" || t.category[0] === "Interest" || t.category[0] === "Payment" || t.category[0] === "Tax" || t.category[0] === "Transfer") {
					releventTransactions.push(t);
				}
			});
		} else {
			this.props.transactions.forEach(t => {
				if (t.category !== null && t.category[0] === categoryString) {
					releventTransactions.push(t);
				}
			});
		}

		// Get the total spent for the current Category
		let total = 0;
		releventTransactions.forEach((transaction) => {
			total += transaction.amount;
		});

		total = formatAmount(total);

		this.openCategoryViewer();

		// Sort the transactions newest to oldest
		releventTransactions.sort((a, b) => {
			let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateOne - dateTwo;
		});

		// Update the state with the relevent transactions and how the user is sorting them
		this.setState({
			categoryTransactions: releventTransactions,
			categoryType: categoryString,
			categoryTotal: total
		});
	}

	getDate(e, val) {
		this.setState({ [val]: e.target.value });
	}

	getAccountDisplayName(accountID, defaultName) {
		const x = this.state.displayNames;
		const displayName = x[accountID];

		if (displayName !== undefined) return displayName
		return defaultName;
	}

	async searchByDate(e) {
		// TODO: Need additional validation if using forms to get data
		// Ensure month is between 1 and 12
		// Ensure the day given is between 1 - 30, 1 -31, 1 - 28 or 1 - 29 based on the month and year
		// Don't allow a range greater than 5 years or some other arbitrary amount

		e.preventDefault();
		let dateOne = new Date(this.state.yearOne, this.state.monthOne - 1, this.state.dayOne);
		let dateTwo = new Date(this.state.yearTwo, this.state.monthTwo - 1, this.state.dayTwo);
		let releventTransactions = [];
		let total = 0;

		try {

			const data = await axios({
				method: "POST",
				url: "/plaid-api/transactions",
				data: {
					startDate: dateOne,
					endDate: dateTwo
				}
			});

			data.forEach(acct => {
				acct.transactions.forEach(transaction => {
					releventTransactions.push(transaction);
					total += transaction.amount;
				});
			});

			total = formatAmount(total);

			// Sort the transactions newest to oldest
			releventTransactions.sort((a, b) => {
				let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
				let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
				return dateOne - dateTwo;
			});

			this.setState({
				categoryTransactions: releventTransactions,
				categoryType: `${this.state.months[dateOne.getMonth()]} ${dateOne.getDate()} - ${this.state.months[dateTwo.getMonth()]} ${dateTwo.getDate()}`,
				categoryTotal: total
			});
		} catch (err) {
			console.error(err);
		}

	}

	async searchByKeyword(e) {
		e.preventDefault();
		let releventTransactions = [];
		const keyWord = this.state.keyWord || "all";
		const normalizedKeyWord = keyWord.toLowerCase();

		let total = 0;

		// If the user doesn't enter anything, show them the default stuff
		if (normalizedKeyWord === "all") {
			this.getAccountTransactions("all");
			return;
		} else {
			this.props.transactions.forEach(t => {
				let normalizedTransactionName = t.name.toLowerCase();

				if (normalizedTransactionName.includes(normalizedKeyWord)) {
					total += t.amount;
					releventTransactions.push(t);
				}
			});
		}

		total = formatAmount(total);

		// Sort the transactions newest to oldest
		releventTransactions.sort((a, b) => {
			let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateOne - dateTwo;
		});

		this.setState({
			categoryType: toTitleCase(keyWord),
			categoryTransactions: releventTransactions,
			categoryTotal: total
		});
	}

	getKeyword(e) {
		e.preventDefault();

		let keyWord = e.target.value.trim() // helpers.toTitleCase(e.target.value);

		this.setState({
			keyWord: keyWord
		});
	}

	openCategoryViewer() {
		let otherViewer = document.querySelector(".accounts--search-options--icon-search--accts-search--accts");
		otherViewer.classList.remove("accounts--search-options--icon-search--accts-search--accts__active");

		const elem = document.querySelector(".accounts--search-options--icon-search--categorical-search--categories");
		elem.classList.add("accounts--search-options--icon-search--categorical-search--categories__active");
	}

	closeCategoryViewer() {
		const elem = document.querySelector(".accounts--search-options--icon-search--categorical-search--categories");
		elem.classList.remove("accounts--search-options--icon-search--categorical-search--categories__active");
	}

	openAccountsViewer() {
		const otherViewer = document.querySelector(".accounts--search-options--icon-search--categorical-search--categories");
		otherViewer.classList.remove("accounts--search-options--icon-search--categorical-search--categories__active");

		const elem = document.querySelector(".accounts--search-options--icon-search--accts-search--accts");
		elem.classList.add("accounts--search-options--icon-search--accts-search--accts__active");
	}

	closeAccountsViewer() {
		const elem = document.querySelector(".accounts--search-options--icon-search--accts-search--accts");
		elem.classList.remove("accounts--search-options--icon-search--accts-search--accts__active");
	}

	render() {

		const amtColor = this.state.categoryTotal * -1 > 0 ? 'green' : 'red';

		return (
			<div className="accounts">

				<div className="accounts--search-options">

					<div className="accounts--search-options--keyword-search">
						{/*<FontAwesomeIcon className="icon" icon={faSearch}/>*/}

						<form onSubmit={this.searchByKeyword}>
							<input type="text" placeholder="Search by transaction name" value={this.state.keyWord} onChange={(e) => { this.getKeyword(e) }} />
						</form>
					</div>

					<div className="accounts--search-options--icon-search">

						<div className="accounts--search-options--icon-search--categorical-search">
							<FontAwesomeIcon className="icon" icon={faTags} onMouseEnter={this.openCategoryViewer} />

							{/* display this div when icon above is clicked */}
							<div className="accounts--search-options--icon-search--categorical-search--categories" onMouseLeave={this.closeCategoryViewer}>
								<div>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Food and Drink"); this.closeCategoryViewer(); }} icon={faUtensils}/><p>Food and Drink</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Travel"); this.closeCategoryViewer(); }} icon={faPlane}/><p>Travel</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Shops"); this.closeCategoryViewer(); }} icon={faShoppingBag}/><p>Shops</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Recreation") }} icon={faRacquet} /><p>Recreation</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Service"); this.closeCategoryViewer(); }} icon={faWrench}/><p>Service</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Community"); this.closeCategoryViewer(); }} icon={faUsers}/><p>Community</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Healthcare"); this.closeCategoryViewer(); }} icon={faMedkit}/><p>Healthcare</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Bank Fees") }} icon={faUtensils} /><p>Bank Fees</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Cash Advance") }} icon={faUtensils} /><p>Cash Advance</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Interest"); this.closeCategoryViewer(); }} icon={faPercent} /><p>Interest</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Payment"); this.closeCategoryViewer(); }} icon={faMoneyBillAlt}/><p>Payment</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Tax") }} icon={faUtensils} /><p>Tax</p></section>
									<section><FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Transfer"); this.closeCategoryViewer(); }} icon={faExchangeAlt}/><p>Transfer</p></section>
								</div>
							</div>
						</div>

						<div className="accounts--search-options--icon-search--date-search">
							<FontAwesomeIcon className="icon" icon={faCalendar} />
						</div>

						<div className="accounts--search-options--icon-search--accts-search">
							<FontAwesomeIcon className="icon" icon={faUniversity} onMouseEnter={this.openAccountsViewer} />

							{/* display this div when icon above is clicked */}
							<div className="accounts--search-options--icon-search--accts-search--accts" onMouseLeave={this.closeAccountsViewer}>
								<div>
									<button onClick={() => { this.getAccountTransactions("all"); this.closeAccountsViewer(); }}>All Transactions</button>

									{/* Generate a button for each type of account connected */}
									{this.props.accounts.map( (a, index) =>
										<button key={index} onClick={() => { this.getAccountTransactions(a.account_id); this.closeAccountsViewer(); }}>{this.getAccountDisplayName(a.account_id, a.name)}</button>
									)}
								</div>
							</div>
						</div>

					</div>

				</div>

				<WeekSpendingChart transactions={this.state.categoryTransactions}/>

				<h2 className="accounts--totals">{this.state.categoryType}: <span className={amtColor}>${numberWithCommas(this.state.categoryTotal * -1)}</span></h2>

				<TransactionContainer transactions={this.state.categoryTransactions} accounts={this.props.accounts} />
			</div>
		);
	}
}

export default AccountsContainer;
