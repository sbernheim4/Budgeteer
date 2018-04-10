import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import "../scss/globals.scss";
import "../scss/app.scss";

import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Loading from './Loading.jsx';
import Statistics from './Statistics.jsx';
import AccountsContainer from './AccountsContainer.jsx';
import Networth from './Networth.jsx';
import Settings from './Settings.jsx';

// Helper Functions
import helpers from './helpers.js';
import differenceInDays from 'date-fns/difference_in_days';
import startOfWeek from 'date-fns/start_of_week';
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';
import startOfMonth from 'date-fns/start_of_month';

class App extends Component {
	constructor(props) {
		super(props);
		let x = new Set();
		let y = new Set()

		this.state = {
			transactions: [],
			accounts: [],
			account_ids: x,
			transaction_ids: y,
			counter: 0
		};

		this.getTransactions = this.getTransactions.bind(this);
	}

	async componentDidMount() {

		try {
			// First make a fetch call to get info for already linked accounts

			// TODO: Need to see if there is an error returned from this call --> If
			// `{ "Error": "No Account Infromation Found" }` is received than it means
			// no accounts are linked
			fetch('plaid-api/set-stored-access-token', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});


			this.getTransactions();

			// Used for if the user wants to link a new account
			let keyAndEnv = await fetch('plaid-api/key-and-env');
			keyAndEnv = await keyAndEnv.json();

            const plaid = Plaid.create({
				apiVersion: 'v2',
				clientName: 'Plaid Walkthrough Demo',
				env: keyAndEnv.env,
				product: ['transactions'],
				key: keyAndEnv.publicKey,
				onSuccess: function (public_token) {
					fetch('/plaid-api/get-access-token', {
						method: 'post',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							public_token: public_token,
							client_id: '5a24ca6a4e95b836d37e37fe',
							secret: 'f07a761a591de3cbbc5ac3ba2f4301'
						})
					});
				}
			});

			this.setState({ handler: plaid });

		} catch (err) {
			console.error('This is likely due to the access tokens not being retrieved from the DB if its a new user');
			console.error(err);
		}
	}

	async getTransactions() {
		// Setup info for fetch call
		let now = new Date(); // Jan. 12th 2018
		let prev = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); // Jan. 12th 2017
		prev = addMonths(prev, 1); // Feb. 12th 2017
        prev = startOfMonth(prev); // Returns Feb 1st 2017
		let numDays = differenceInDays(now, prev); // Get the number of days difference between now and about a year ago

		let fetchOptions = {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				days: numDays
			})
		};

		try {
			const response = await fetch('/plaid-api/transactions', fetchOptions); // Fetch all transaction info
			const data = await response.json(); // convert data to json

			await this.storeAccounts(data); // Store account info
			await this.storeTransactions(data); // store transaction info

			let x = this.state.counter;
			x++;
			this.setState({
				counter: x
			});

		} catch (err) {
			const errorMessage = document.querySelector('.app-error');
			errorMessage.classList.add('app-error__display');

			setTimeout(() => {
				errorMessage.classList.remove('app-error__display')
			}, 4000)

			console.error(err);
		}
	}

	async storeTransactions(data) {

		let currentTransactions = this.state.transactions;
		let currentTransactionIds = this.state.transaction_ids;

		data.forEach(val => {
			// Add all the transactions for the new bank the user just selected
			val.transactions.forEach(t => {
				if (!currentTransactionIds.has(t.transaction_id)) {
					currentTransactionIds.add(t.transaction_id);
					currentTransactions.push(t);
				}
			})

			// Sort the transactions based on account_id
			currentTransactions = currentTransactions.sort((a, b) => {
				return a.account_id - b.account_id;
			});

		});

		// Update state variable
		this.setState({
			transaction_ids: currentTransactionIds,
			transactions: currentTransactions
		});
	}

	async storeAccounts(data) {
		// Get all the connected accounts so far
		let currentAccounts = this.state.accounts;

		data.forEach(val => {

			// Add all the accounts for the new bank the user just selected
			val.accounts.forEach(acct => {
				if (!this.state.account_ids.has(acct.account_id)) {
					this.state.account_ids.add(acct.account_id);
					currentAccounts.push(acct);
				}
			});

			// Sort the accounts based on account_id
			currentAccounts = currentAccounts.sort((a, b) => {
				return a.account_id - b.account_id
			});
		});

		// Update accounts state variable
		this.setState({ accounts: currentAccounts })
	}

	render() {
		let loading = this.state.counter !== 1;

		return (
			<div>
				<Navbar />

				<div className='app-error'>
					<p>An error has occurred, redirecting back to home page</p>
				</div>

				{/* <Link /> elements are in Navbar.jsx */}
				<Route exact path='/' render={() => (
					<Home
						loading={loading}
					/>
				)}/>

				<Route path='/statistics' render={() => (
					<Statistics
						transactions={this.state.transactions}
					/>
				)}/>

				<Route path='/transactions' render={() => (
					<AccountsContainer
						transactions={this.state.transactions}
						accounts={this.state.accounts}
					/>
				)}/>

				<Route path='/networth' render={() => (
					<Networth
						transactions={this.state.transactions}
					/>
				)}/>

				<Route path='/settings' render={() => (
					<Settings
						accounts={this.state.accounts}
					/>
				)}/>

			</div>
		);
	}
}

export default App;
