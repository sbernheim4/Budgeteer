import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import axios from 'axios';

import "../scss/globals.scss";

import Navbar from '../Navbar/Navbar.jsx';
import Home from '../Home/Home.jsx';
import Statistics from '../Statistics/Statistics.jsx';
import AccountsContainer from '../AccountsContainer/AccountsContainer.jsx';
import Networth from '../Networth/Networth.jsx';
import Settings from '../Settings/Settings.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

// Helper Functions
import helpers from '../helpers.js';
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
			counter: 0,
			showErrorMessage: false
		};

		this.getTransactions = this.getTransactions.bind(this);
	}

	async componentDidMount() {

		/*this.registerServiceWorker();*/
		this.getTransactions();

	}

	registerServiceWorker() {
		console.log("this is where the service worker should be registered");
		// Registering ServiceWorker
		// if ('serviceWorker' in navigator) {
		// 	navigator.serviceWorker.register('sw.js').then(function(registration) {
		// 		// Registration was successful
		// 		console.log('ServiceWorker registration successful with scope: ', registration.scope);
		// 	}).catch(function(err) {
		// 		// registration failed :(
		// 		console.log('ServiceWorker registration failed: ', err);
		// 	});
		// }
	}

	// Get transactions for the past year and store them in the state
	async getTransactions() {

		let now = new Date(); // Jan. 12th 2018
		let prev = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); // Jan. 12th 2017
		prev = addMonths(prev, 1); // Feb. 12th 2017
		prev = startOfMonth(prev); // Returns Feb 1st 2017
		let numDays = differenceInDays(now, prev); // Get the number of days difference between now and about a year ago

		try {

			let blob = await axios.post('/plaid-api/transactions', {
				days: numDays
			});
			blob = blob.data;

			await this.storeAccounts(blob); // Store account info
			await this.storeTransactions(blob); // store transaction info

			let x = this.state.counter;
			x++;
			this.setState({
				counter: x
			});

		} catch (err) {
			// const errorMessage = document.querySelector('.app-error');
			// errorMessage.classList.add('app-error__display');

			// setTimeout(() => {
			// 	errorMessage.classList.remove('app-error__display')
			// }, 4000)

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
				<ErrorMessage display={this.state.showErrorMessage} text={this.state.errorMessage}/>

				<div className="main">
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

				{/* <Link /> elements are in Navbar.jsx */}

			</div>
		);
	}
}

export default App;
