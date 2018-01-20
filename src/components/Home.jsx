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

        let x = new Set();
        let y = new Set()

		this.state = {
			transactions: [],
			accounts: [],
			account_ids: x,
			transaction_ids: y,
			netWorth: 0
        };

        this.addAccount = this.addAccount.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
	}

	componentWillMount() {

        // First make a fetch call to see if access_tokens and item_ids can be retrieved from DB
        fetch("plaid-api/set-stored-access-token", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then( res => {
            return res.json()
        }).then(res => {
            console.log(res.SET);
            if (res.SET) throw new Error("SET");
            fetch("plaid-api/key-and-env");
        }).then(response => {
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

	addAccount() {
		this.state.handler.open();
    }

    async getTransactions() {

        // Setup info for fetch call
		let now = new Date(); // Jan. 12th 2018
		let prev = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); // Jan. 12th 2017
		prev = addMonths(prev, 1); // Feb. 12th 2017
		prev = startOfMonth(prev); // Returns Feb 1st 2017
		let numDays = differenceInDays(now, prev); // Get the number of days difference between now and about a year ago

        let fetchOptions = {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                days: numDays
            })
        };

        try {

            const response = await fetch("/plaid-api/transactions", fetchOptions); // Fetch transaction info
            const data = await response.json(); // convert data to json

            await this.storeAccounts(data.accounts); // Store account info
            await this.storeTransactions(data.transactions); // store transaction info
            this.getNetWorth(); // store networth

        } catch(err) {
            const errorMessage = document.querySelector(".home--error");
            errorMessage.classList.add("home--error__display");

            setTimeout(() => {
                errorMessage.classList.remove("home--error__display")
            }, 4000)

            console.error(err);
        }
	}

    async storeTransactions(transactions) {
        let currentTransactions = this.state.transactions;
        let currentTransactionIds = this.state.transaction_ids;

        // Add all the transactions for the new bank the user just selected
        transactions.forEach((t) => {
            if (!currentTransactionIds.has(t.transaction_id)) {
                currentTransactionIds.add(t.transaction_id);
                currentTransactions.push(t);
            }
        })

        // Sort the transactions based on account_id
        currentTransactions = currentTransactions.sort((a, b) => {
            return a.account_id - b.account_id;
        });

        // Update transactions state variable
        this.setState({ transaction_ids: currentTransactionIds });
        this.setState({ transactions: currentTransactions });
    }

    async storeAccounts(accounts) {
        // Get all the connected accounts so far
        let currentAccounts = this.state.accounts;

        // Add all the accounts for the new bank the user just selected
        accounts.forEach(acct => {
            if (!this.state.account_ids.has(acct.account_id)) {
                this.state.account_ids.add(acct.account_id);
                currentAccounts.push(acct);
            }
        });

        // Sort the accounts based on account_id
        currentAccounts = currentAccounts.sort((a, b) => {
            return a.account_id - b.account_id
        });

        // Update accounts state variable
        this.setState({ accounts: currentAccounts })
    }

    getNetWorth() {
        let netWorth = 0;

        this.state.accounts.forEach(acct => {
            if(acct.balances.available !== null) {
                netWorth += acct.balances.available;
            }
        });

        this.setState({ netWorth: netWorth });
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
            networth = <Networth netWorth={this.state.netWorth}/>
		}

		return (
			<div className="home">

				<div className="home--btns">
					<button className="home--btns__blue" onClick={this.addAccount}>Add Accounts</button>
                    <button className="home--btns__green" onClick={this.getTransactions}>Get Transactions</button>
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
