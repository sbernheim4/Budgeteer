import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import "../scss/app.scss";

import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Statistics from './Statistics.jsx';
import AccountsContainer from './AccountsContainer.jsx';
import Networth from './Networth.jsx';

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
			netWorth: 0
		};

		this.addAccount = this.addAccount.bind(this);
		this.getTransactions = this.getTransactions.bind(this);
	}

	async componentDidMount() {

		try {
			// First make a fetch call to get info for already linked accounts
			fetch('plaid-api/set-stored-access-token', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});

			this.getTransactions();
			this.getNetWorth(); // store networth

			// Used for if the user wants to link a new account
			let info = await fetch('plaid-api/key-and-env');
			info = await info.json();
			const plaid = Plaid.create({
				apiVersion: 'v2',
				clientName: 'Plaid Walkthrough Demo',
				env: info.env,
				product: ['transactions'],
				key: info.publicKey,
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
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				days: numDays
			})
		};

		try {
			const response = await fetch('/plaid-api/transactions', fetchOptions); // Fetch transaction info
			const data = await response.json(); // convert data to json

			// TODO: Might need to have a foreach loop if the way it gets
			// aggregated is in a new index of the array

			await this.storeAccounts(data); // Store account info
			await this.storeTransactions(data); // store transaction info

		} catch (err) {
			const errorMessage = document.querySelector('.home--error');
			errorMessage.classList.add('home--error__display');

			setTimeout(() => {
				errorMessage.classList.remove('home--error__display')
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
		})


		// Update accounts state variable
		this.setState({ accounts: currentAccounts })
	}

	async getNetWorth() {
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};

		let data = await fetch('plaid-api/balance', fetchOptions);
		data = await data.json();

		this.setState({ netWorth: data.netWorth });
	}

	render() {

		return (
			<div>
				<Navbar />

				<div className='app'>
					<div className='app--btns'>
						<button className='app--btns__blue' onClick={this.addAccount}>Add Accounts</button>
						{/* <button className='app--btns__green' onClick={this.getTransactions}>Get Transactions</button>*/}                    </div>

					<div className='app--error'>
						<p>Please first link an account</p>
					</div>
				</div>

				{/* <Link /> elements are in Navbar.jsx */}
				<Route exact path='/' component={Home} />

				<Route path='/statistics' render={() => (<Statistics
						transactions={this.state.transactions}
				/>)}/>

				<Route path='/accounts' render={() => (<AccountsContainer
					transactions={this.state.transactions}
					accounts={this.state.accounts}
				/>)}/>

				<Route path='/networth' render={() => (<Networth
					netWorth={this.state.netWorth}
				/>)}/>

			</div>
		);
	}
}

export default App;
