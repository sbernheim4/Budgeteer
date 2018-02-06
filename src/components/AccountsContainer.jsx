import React, { Component } from "react";
import TransactionContainer from "./TransactionContainer.jsx";
import "../scss/accountsContainer.scss"

import helpers from './helpers';

class AccountsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// this state variable is used to keep track of transactions the
			// user wants to see
			categoryTransactions: [],
			// Stores how the user is currently sorting their transactions
			categoryType: "",
			categoryTotal: 0,
			keyWord: "Uber, Netflix..."
		};

		this.getAccountTransactions = this.getAccountTransactions.bind(this);
		this.getCategoryTransactions = this.getCategoryTransactions.bind(this);
		this.getDate = this.getDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.searchByKeyword = this.searchByKeyword.bind(this);
		this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
	}

	getAccountTransactions(account_id) {
		let allTransactions = this.props.transactions;

		let releventTransactions = [];
		let type;
		let total = 0;

		if (account_id === "none") {
			releventTransactions = [];
			type = "";
		} else if (account_id === "all") {
			releventTransactions = allTransactions;
			type = "All Categories";
		} else {
			allTransactions.map( (transaction) => {
				if (transaction.account_id === account_id) {
					releventTransactions.push(transaction);
				}
			});
		}

		releventTransactions.forEach((transaction) => {
			total += transaction.amount;
		});

		total = helpers.formatAmount(total);
		total = helpers.numberWithCommas(total);

		// Update the state with the relevent transactions and how the user is sorting them
		this.props.accounts.forEach(account => {
			if (account.account_id === account_id) {
				type = account.name;
				return;
			}
		});


		this.setState({
			categoryTransactions: releventTransactions,
			categoryType: type,
			categoryTotal: total
		});

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
		total = helpers.numberWithCommas(total);

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

	async handleSubmit(e) {
		const months = ["Jan.", "Feb.", "Mar.", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

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
			total = helpers.numberWithCommas(total);

			this.setState({
				categoryTransactions: releventTransactions,
				categoryType: `${months[dateOne.getMonth()]} ${dateOne.getDate()} - ${months[dateTwo.getMonth()]} ${dateTwo.getDate()}`,
				categoryTotal: total
			});
		} catch (err) {
			console.error(err);
		}
	}

	async searchByKeyword(e) {
		e.preventDefault();

		let releventTransactions = [];
		let keyword = this.state.keyWord.toLowerCase();

		let total = 0;
		this.props.transactions.forEach(t => {
			let transactionName = t.name.toLowerCase();

			if (transactionName.includes(keyword)) {
				total += t.amount;
				releventTransactions.push(t);
			}
		});

		total = helpers.formatAmount(total);
		total = helpers.numberWithCommas(total);

		if (this.state.keyWord === "" || this.state.keyWord === null) {
			this.setState({keyWord: "Everything"});
		}

		this.setState({
			categoryTransactions: releventTransactions,
			categoryType: this.state.keyWord,
			categoryTotal: total
		});
	}

	handleKeywordSearch(e) {
		let keyWord = helpers.toTitleCase(e.target.value);
		this.setState({keyWord: helpers.toTitleCase(e.target.value)})
	}

	render() {

		return (
			<div className="accounts">

				<h3 className="accounts--sort-options" >Sort by Account Type</h3>
				<div className="accounts--btns">
					{/* Show All Transactions */}
					<button onClick={() => { this.getAccountTransactions("all")}}>All Transactions</button>

					{/* Generate a button for each type of account connected */}
					{this.props.accounts.map( (a, index) =>
					<button key={index} onClick={() => { this.getAccountTransactions(a.account_id)}}>{a.name}</button>
					)}

					{/* Hide All Transactions */}
					<button onClick={() => { this.getAccountTransactions("none")}}>Hide Transactions</button>
				</div>

				<h3 className="accounts--sort-options">Sort by Categories</h3>
				<div className="accounts--btns">
					<button onClick={() => { this.getCategoryTransactions("Food and Drink") }}>Food and Drink</button>
					<button onClick={() => { this.getCategoryTransactions("Travel") }}>Travel</button>
					<button onClick={() => { this.getCategoryTransactions("Shops") }}>Shops</button>
					<button onClick={() => { this.getCategoryTransactions("Recreation") }}>Recreation</button>
					<button onClick={() => { this.getCategoryTransactions("Service") }}>Service</button>
					<button onClick={() => { this.getCategoryTransactions("Community") }}>Community</button>
					<button onClick={() => { this.getCategoryTransactions("Healthcare") }}>Healthcare</button>
					<button onClick={() => { this.getCategoryTransactions("Other") }}>Other</button>
				</div>


				<form className="accounts--date-picker" onSubmit={this.handleSubmit}>

					<div>
						<p>Begin Date</p>
						<label>Month
							<input type="text" vale={this.state.monthOne} onChange={(e) => {this.getDate(e, 'monthOne') }} />
						</label>

						<label>Day
							<input type="text" vale={this.state.dayOne} onChange={(e) => { this.getDate(e, 'dayOne') }} />
						</label>

						<label>Year
							<input type="text" vale={this.state.yearOne} onChange={(e) => { this.getDate(e, 'yearOne') }} />
						</label>
					</div>


					<div>
						<p>End Date</p>
						<label>Month
							<input type="text" vale={this.state.monthTwo} onChange={(e) => { this.getDate(e, 'monthTwo') }} />
						</label>

						<label>Day
							<input type="text" vale={this.state.dayTwo} onChange={(e) => { this.getDate(e, 'dayTwo') }} />
						</label>

						<label>Year
							<input type="text" vale={this.state.YearTwo} onChange={(e) => { this.getDate(e, 'yearTwo') }} />
						</label>
					</div>

					<br />
					<input type="submit" value="Submit"/>

				</form>

				<form className='accounts--keyword-search' onSubmit={this.searchByKeyword}>
					<label>Search by Keyword
						<input type="text" value={this.state.keyWord} onChange={(e) => {this.handleKeywordSearch(e)}} />
					</label>
					<input type="submit" value="Submit"/>
				</form>


				<h2 className="accounts--totals">Total spent on {this.state.categoryType}</h2>
				<h2 className="accounts--totals">${this.state.categoryTotal}</h2>

				<TransactionContainer transactions={this.state.categoryTransactions} />
			</div>
		);
	}
}

export default AccountsContainer;
