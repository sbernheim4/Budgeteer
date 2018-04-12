/* eslint no-undefined: 0 */
import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import TransactionContainer from "./TransactionContainer.jsx";

import subWeeks from 'date-fns/sub_weeks';
import isAfter from 'date-fns/is_after';
import isWithinRange from 'date-fns/is_within_range';
import differenceInDays from 'date-fns/difference_in_days';

import "../scss/accountsContainer.scss"

import helpers from './helpers';

// Font Awesome base package
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// Selective icons from Font Awesome
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
			keyWord: "",
			months : ["Jan.", "Feb.", "Mar.", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
		};

		this.generateBarChartData = this.generateBarChartData.bind(this);
		this.getAccountTransactions = this.getAccountTransactions.bind(this);
		this.getCategoryTransactions = this.getCategoryTransactions.bind(this);
		this.getDate = this.getDate.bind(this);
		this.searchByDate = this.searchByDate.bind(this);
		this.searchByKeyword = this.searchByKeyword.bind(this);
		this.getKeyword = this.getKeyword.bind(this);
	}

	componentDidMount() {
		this.getAccountTransactions("all");
	}

	componentWillReceiveProps() {
		// On first load show all transactions by default for the user
		this.getAccountTransactions("all");
	}

	generateBarChartData(transactions) {
		// this is off, need to get all the transactions in the past 14 days,
		// sum up the total spent for each day
		const endDate = new Date();
		const startDate = subWeeks(endDate, 2);

		let startingIndex = 0;

		for (let [index, t] of transactions.entries()) {
			let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			// Get the index of the first transaction to fall inside the range
			if (isWithinRange(transactionDate, startDate, endDate)) {
				startingIndex = index;
				break;
			}

			// If we get through the whole array and haven't yet returned it means there
			// are no transactions which fall within our range
			if (index === transactions.length - 1) {
				startingIndex = 0;
			}
		}

		let amts = new Array(14).fill(0);

		if (startingIndex !== 0) {
			const mostRecentFourteenTransactions = transactions.slice(startingIndex);

			mostRecentFourteenTransactions.forEach(t => {
				let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));
				const index = differenceInDays(endDate, transactionDate);

				amts[index] += t.amount;
			});

			amts.reverse();
		}

		const data = {
			labels: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "Yesterday", "Today"],
			datasets: [{
				label: "$ Spent / Day",
				data: amts,
				backgroundColor: "rgb(77, 153, 114)",
			}]
		};

		const barOptions = {
			tooltips: {
				callbacks: {
					title: function(item) {
						// Less than 12 exception to ignore the Yesterday and Today values in the labels otherwise show x days ago
						return item[0].index < 12 ? item[0].xLabel + " Days Ago" : item[0].xLabel;
					},
					label: function(item) {
						const amt = helpers.numberWithCommas(helpers.formatAmount(item.yLabel));
						return item.yLabel > 0 ? "Spent $" + amt : "Received $" + helpers.formatAmount(amt * -1);
						// Show the user `Spent $17.20` or `Received $17.20` --> need the
						// formatAmount again since multiplying by -1 removes the trailing 0
						// decimal
					}
				}
			},
			title: {
				display: true,
				text: "2 Week Spending History",
				fontSize: 20
			},
			scales: {
				xAxes: [{
					barThickness: 7,
					ticks: {
						fontSize: 15
					}
				}],
				yAxes: [{
					ticks: {
						fontSize: 15,
						callback: function(value, index, values) {
							return '$' + helpers.numberWithCommas(value);
						}
					}
				}]
			},
			legend: {
				display: false,
				labels: {
					display: false
				}
			}
		}

		this.setState({
			chartDisplay: <Bar data={data} options={barOptions} />
		});
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

		total = helpers.formatAmount(total);

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

		// Redraw the bar chart based
		this.generateBarChartData(releventTransactions);
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

		total = helpers.formatAmount(total);

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

		// Redraw the bar chart based
		this.generateBarChartData(releventTransactions);
	}

	getDate(e, val) {
		this.setState({ [val]: e.target.value });
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
		let fetchOptions = {
			method: 'post',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				startDate: dateOne,
				endDate: dateTwo
			})
		};

		try {

			let data = await fetch('/plaid-api/transactions', fetchOptions);
			data = await data.json();

			data.forEach(acct => {
				acct.transactions.forEach(transaction => {
					releventTransactions.push(transaction);
					total += transaction.amount;
				});
			});

			total = helpers.formatAmount(total);

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

		// Redraw the bar chart based
		this.generateBarChartData(releventTransactions);
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

		total = helpers.formatAmount(total);

		// Sort the transactions newest to oldest
		releventTransactions.sort((a, b) => {
			let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateOne - dateTwo;
		});

		this.setState({
			categoryType: helpers.toTitleCase(keyWord),
			categoryTransactions: releventTransactions,
			categoryTotal: total
		});

		// Redraw the bar chart based
		this.generateBarChartData(releventTransactions);
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

		let amtColor = 'red';
		if (this.state.categoryTotal * -1 > 0) {
			amtColor = 'green';
		}

		return (
			<div className="accounts">

				<div className="accounts--search-options">

					<div className="accounts--search-options--keyword-search">
						<FontAwesomeIcon className="icon" icon={faSearch}/>

						<form onSubmit={this.searchByKeyword}>
							<label>
								<input type="text" placeholder="Search by transaction name" value={this.state.keyWord} onChange={(e) => { this.getKeyword(e) }} />
							</label>
						</form>
					</div>

					<div className="accounts--search-options--icon-search">

						<div className="accounts--search-options--icon-search--categorical-search">
							<FontAwesomeIcon className="icon" icon={faTags} onMouseEnter={this.openCategoryViewer} />

							{/* display this div when icon above is clicked */}
							<div className="accounts--search-options--icon-search--categorical-search--categories" onTouchEnd={this.closeCategoryViewer} onMouseLeave={this.closeCategoryViewer}>
								<div>
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Food and Drink"); this.closeCategoryViewer(); }} icon={faUtensils} />
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Travel"); this.closeCategoryViewer(); }} icon={faPlane} />
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Shops"); this.closeCategoryViewer(); }} icon={faShoppingBag} />
									{/* <FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Recreation") }} icon={faRacquet} /> */}
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Service"); this.closeCategoryViewer(); }} icon={faWrench} />
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Community"); this.closeCategoryViewer(); }} icon={faUsers} />
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Healthcare"); this.closeCategoryViewer(); }} icon={faMedkit} />
									{/* <FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Bank Fees") }} icon={Bank fees} /> */}
									{/* <FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Cash Advance") }} icon={Cash advance} /> */}
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Interest"); this.closeCategoryViewer(); }} icon={faPercent} />
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Payment"); this.closeCategoryViewer(); }} icon={faMoneyBillAlt} />
									{/* <FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Tax") }} icon={Tax} /> */}
									<FontAwesomeIcon className="category-icon" onClick={() => { this.getCategoryTransactions("Transfer"); this.closeCategoryViewer(); }} icon={faExchangeAlt} />
								</div>
							</div>
						</div>

						<div className="accounts--search-options--icon-search--date-search">
							<FontAwesomeIcon className="icon" icon={faCalendar} />
						</div>

						<div className="accounts--search-options--icon-search--accts-search">
							<FontAwesomeIcon className="icon" icon={faUniversity} onMouseEnter={this.openAccountsViewer} />

							{/* display this div when icon above is clicked */}
							<div className="accounts--search-options--icon-search--accts-search--accts" onTouchEnd={this.closeAccountsViewer} onMouseLeave={this.closeAccountsViewer}>
								<div>
									<button onClick={() => { this.getAccountTransactions("all"); this.closeAccountsViewer(); }}>All Transactions</button>

									{/* Generate a button for each type of account connected */}
									{this.props.accounts.map( (a, index) =>
										<button key={index} onClick={() => { this.getAccountTransactions(a.account_id); this.closeAccountsViewer(); }}>{a.name}</button>
									)}
								</div>
							</div>
						</div>

					</div>
				</div>

				<h2 className="accounts--totals">{this.state.categoryType}: <span className={amtColor}>${helpers.numberWithCommas(this.state.categoryTotal * -1)}</span></h2>
				<div className="accounts--chart">
					{this.state.chartDisplay}
				</div>

				<TransactionContainer transactions={this.state.categoryTransactions} accounts={this.props.accounts} />
			</div>
		);
	}
}

export default AccountsContainer;
