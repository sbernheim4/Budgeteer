import React, { Component } from "react";

import AccountsContainer from "./AccountsContainer.jsx";
import Statistics from "./Statistics.jsx";
import Networth from "./Networth.jsx";

import helpers from "./helpers.js";

import differenceInDays from "date-fns/difference_in_days";
import startOfWeek from "date-fns/start_of_week";
import addWeeks from "date-fns/add_weeks";
import addMonths from "date-fns/add_months";
import startOfMonth from "date-fns/start_of_month";

import "../scss/home.scss";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transactions: [],
			accounts: [],
			account_ids: new Set(),
			transaction_ids: new Set(),
			netWorth: 0
		};
	}

	componentWillMount() {
		fetch("plaid-api/key-and-env").then(response => {
			return response.json();
		}).then(res => {
			const plaid = Plaid.create({
				apiVersion: "v2",
				clientName: "Plaid Walkthrough Demo",
				env: res.env,
				product: ["transactions"],
				key: res.publicKey,
				onSuccess: function (public_token) {
					fetch("/plaid-api/get-access-token", {
						method: "post",
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							public_token: public_token,
							client_id: "5a24ca6a4e95b836d37e37fe",
							secret: "f07a761a591de3cbbc5ac3ba2f4301"
						})
					});
				}
			});

			this.setState({ handler: plaid });
		}).catch(err => {
			console.error(err)
		});
	}

	componentDidMount() {

	}

	addAccount() {
		this.state.handler.open();
	}

	getTransactions() {
		let now = new Date(); // Jan. 12th 2018

		let prev = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); // Jan. 12th 2017
		prev = addMonths(prev, 1); // Feb. 12th 2017
		prev = startOfMonth(prev); // Returns Feb 1st 2017

		let numDays = differenceInDays(now, prev); // Get the number of days difference between now and about a year ago

		fetch("/plaid-api/transactions", {
			method: "post",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				days: numDays
			})
		}).then(data => {
			return data.json();
		}).then(data => {
			if (!data.transactions || !data.accounts) {
				const errorMessage = document.querySelector(".home--error");
				errorMessage.classList.add("home--error__display");

				setTimeout(() => {
					errorMessage.classList.remove("home--error__display")
				}, 4000)
			} else {
				this.storeTransactions(data.transactions);
				this.storeAccounts(data.accounts);
			}
		}).catch(err => {
			throw err;
		});
	}

	storeAccounts(accounts) {
		// Determine if any accounts already exist in the state
		let currentAccounts = this.state.accounts;

		// Add all the accounts for the new bank the user just selected
		accounts.forEach( acct => {
			if (!this.state.account_ids.has(acct.account_id)) {
				this.state.account_ids.add(acct.account_id);
				currentAccounts.push(acct);
			}
		});

		// Sort the accounts based on account_id
		currentAccounts = currentAccounts.sort( (a, b) => {
			return a.account_id - b.account_id
		});

		// Update accounts state variable
		this.setState({accounts: currentAccounts})
	}

	storeTransactions(transactions) {
		let currentTransactions = this.state.transactions;

		// Add all the transactions for the new bank the user just selected
		transactions.forEach( (t) => {
			if (!this.state.transaction_ids.has(t.transaction_id)) {

				// TODO: the state should not be modified directly --> Use
				// setState instead later on and store all the new
				// transaction_ids in a temporary array
				this.state.transaction_ids.add(t.transaction_id);
				currentTransactions.push(t);
			}
		})

		// Sort the transactions based on account_id
		currentTransactions = currentTransactions.sort((a, b) => {
			return a.account_id - b.account_id;
		});

		// Update transactions state variable
		this.setState({ transactions: currentTransactions });
	}

	render() {

		// Conditional Rendering
		let accountsContainer = null;
		let stats = null;
		let networth = null;
		if (this.state.transactions.length === 0 || this.state.accounts === 0) {
			accountsContainer = "";
			stats = "";
			networth = "";
		} else {
			accountsContainer = <AccountsContainer
				transactions={this.state.transactions}
				accounts={this.state.accounts}
			/>

		stats = <Statistics transactions={this.state.transactions} />
		networth = <Networth />
		}

		return (
			<div className="home">

				<div className="home--btns">
					<button className="home--btns__blue" onClick={this.addAccount.bind(this)}>Add Accounts</button>
					<button className="home--btns__green" onClick={this.getTransactions.bind(this)}>Get Transactions</button>
				</div>

				<div className="home--error">
					<p>Please first link an account</p>
				</div>

				{networth}
				{accountsContainer}
				{stats}

			</div>
		);
	}
}

export default Home;
