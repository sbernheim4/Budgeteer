import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import differenceInDays from 'date-fns/difference_in_days';

import BannerMessage from '../BannerMessage/BannerMessage.jsx';
import { Navbar, Home, Statistics, AccountsContainer, Networth, Settings } from '../LazyLoadRoutes.jsx';

import '../scss/globals.scss';

class App extends Component {
	constructor(props) {
		super(props);
		let x = new Set();
		let y = new Set();

		this.state = {
			transactions: [],
			accounts: [],
			account_ids: x,
			transaction_ids: y,
			counter: 0,
			showErrorMessage: false
		};

		this.getTransactions = this.getTransactions.bind(this);
		//this.registerServiceWorker = this.registerServiceWorker.bind(this);
	}

	async componentDidMount() {
		/*this.registerServiceWorker();*/
		this.getTransactions();
	}

	/*registerServiceWorker() {
		console.log("Begin registration of serviceWorker");
		// Registering ServiceWorker
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js').then(function(registration) {
				// Registration was successful
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}).catch(function(err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
			});
		}
	}*/

	async getLastAccessedDate() {
		let lastAccessed = await axios.get('/user-info/last-accessed');
		lastAccessed = new Date(lastAccessed.data);

		const now = new Date();
		const numDaysSinceCacheUpdate = differenceInDays(now, lastAccessed);

		axios.post('/user-info/last-accessed', {
			date: now.toString()
		});

		return numDaysSinceCacheUpdate;
	}

	// Get transactions for the past year and store them in the state
	async getTransactions() {

		try {

			const now = new Date(); // Jan. 12th 2018
			const year = now.getFullYear();
			let month = (now.getMonth() + 1).toString();
			let day = now.getDate().toString();

			month = month.length === 1 ? `0${month}` : month;
			day = day.length === 1 ? `0${day}` : day;

			const startDate = `${year - 1}-${month}-${day}`;
			const endDate = `${year}-${month}-${day}`;

			let transactions = await axios({
				method: 'get',
				url: `/plaid-api/transactions?startDate=${startDate}&endDate=${endDate}`,
			});

			transactions = transactions.data;

			if (transactions.Error) {

				let keyAndEnv = await axios.get('/plaid-api/key-and-env');
				keyAndEnv = keyAndEnv.data;

				// Open plaid in Link Mode
				const plaid = Plaid.create({
					key: keyAndEnv.publicKey,
					env: keyAndEnv.env,
					apiVersion: 'v2',
					clientName: 'Budgeteer',
					product: ['transactions'],
					token: transactions.publicToken,
					onSuccess: function(public_token, metadata) {
						console.log('Update of Account successful');
						console.log('public_token:', public_token);
						console.log('Metadata:', metadata);
					},
					onExit: function(err, metadata) {
						console.log('err:', err);
						console.log('metadata:', metadata);
					}
				});

				plaid.open();

			} else {
				// Store transactions in local storage for future use
				window.localStorage.setItem('allData', JSON.stringify(transactions));

				await this.storeAccounts(transactions); // Store account info in state
				await this.storeTransactions(transactions); // store transaction info in state

				console.log(transactions);
			}

			// Counter used to know when components have loaded
			let x = this.state.counter;
			x++;
			this.setState({
				counter: x
			});
		} catch (err) {
			console.log('ERROR: ');
			console.log(err);
		}
	}

	getDateFromTransaction(str) {
		const split = str.split('-');
		return new Date(parseInt(split[0]), parseInt(split[1]) - 1, parseInt(split[2]));
	}

	async storeTransactions(data) {
		let currentTransactions = this.state.transactions;
		let currentTransactionIds = this.state.transaction_ids;

		data.forEach((bank) => {

			// Add all the transactions for the new bank the user just selected
			bank.transactions.forEach((t) => {

				if (!currentTransactionIds.has(t.transaction_id)) {
					currentTransactionIds.add(t.transaction_id);
					currentTransactions.push(t);
				}

			});
		});

		// Sort the transactions based on account_id
		currentTransactions = currentTransactions.sort((a, b) => {
			const dateA = this.getDateFromTransaction(a.date);
			const dateB = this.getDateFromTransaction(b.date);

			return dateB - dateA;
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

		data.forEach((val) => {
			// Add all the accounts for the new bank the user just selected
			val.accounts.forEach((acct) => {
				if (!this.state.account_ids.has(acct.account_id)) {
					this.state.account_ids.add(acct.account_id);
					currentAccounts.push(acct);
				}
			});

			// Sort the accounts based on account_id
			currentAccounts = currentAccounts.sort((a, b) => {
				return a.account_id - b.account_id;
			});
		});

		// Update accounts state variable
		this.setState({ accounts: currentAccounts });
	}

	render() {
		let loading = this.state.counter !== 1;

		return (
			<div>
				<Navbar />
				<BannerMessage display={this.state.showErrorMessage} text={this.state.errorMessage} />

				<div className='main'>
					<Route
						exact
						path='/'
						render={() => (
							<Home
								loading={loading}
								transactions={this.state.transactions}
								accounts={this.state.accounts}
							/>
						)}
					/>

					<Route path='/statistics' render={() => <Statistics transactions={this.state.transactions} />} />

					<Route
						path='/transactions'
						render={() => (
							<AccountsContainer transactions={this.state.transactions} accounts={this.state.accounts} />
						)}
					/>

					<Route path='/networth' render={() => <Networth transactions={this.state.transactions} />} />

					<Route path='/settings' render={() => <Settings accounts={this.state.accounts} />} />
				</div>

				{/* <Link /> elements are in Navbar.jsx */}
			</div>
		);
	}
}

export default App;
