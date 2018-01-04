import React, { Component } from 'react';

import AccountsContainer from './AccountsContainer.jsx';
import TransactionContainer from './TransactionContainer.jsx';
import Budget from './Budget.jsx';
import Statistics from './Statistics.jsx';

import '../scss/home.scss';

class Home extends Component {
	constructor(props) {
		super(props)

		let setOne = new Set();
		let setTwo = new Set();

		this.state = {
			transactions: [],
			accounts: [],
			account_ids: setOne,
			transaction_ids: setTwo
		};
	}

	componentDidMount() {
		fetch('http://localhost:5000/plaid-api/key-and-env')
		.then(response => {
			return response.json();
		}).then(res => {
			this.setState( {env: res.env, publicKey: res.publicKey} );
			return res;
		}).then( res => {

			// TODO: Change the onSuccess to use fetch instead of jquery

			const plaid = Plaid.create({
				apiVersion: 'v2',
				clientName: 'Plaid Walkthrough Demo',
				env: this.state.env,
				product: ['transactions'],
				key: this.state.publicKey,
				onSuccess: function(public_token) {
					$.post('/plaid-api/get-access-token', {
						public_token: public_token,
						client_id: "5a24ca6a4e95b836d37e37fe",
						secret: "f07a761a591de3cbbc5ac3ba2f4301"
					});
				}
			});

			this.setState({handler: plaid});

		}).catch(err => {
			console.error(err)
		});
	}

	addAccount() {
		this.state.handler.open();
	}

	getTransactions() {
		$.post('/plaid-api/transactions', data => {
			if (!data.transactions || !data.accounts) {

				const errorMessage = document.querySelector('.home--error');
				errorMessage.classList.add('home--error__display');

				setTimeout(() => {
					errorMessage.classList.remove('home--error__display')
				}, 4000)

			} else {
				this.storeTransactions(data.transactions);
				this.storeAccounts(data.accounts);
			}
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

	getTotalSpent() {
		let total = 0;
		// Sum up the prices of each transaction
		this.state.transactions.forEach( transaction => {
			total += transaction.amount;
		})

		// Round total to two decimal places and ensure trailing 0s appear
		total = (Math.round(total * 100) / 100).toFixed(2);
		return total;
	}

	render() {

		// Conditional Rendering
		let accountsContainer = null;
		let budget = null;
		let stats = null;
		if (this.state.transactions.length === 0 || this.state.accounts === 0) {
			accountsContainer = '';
			budget = '';
			stats = '';
		} else {
			accountsContainer = <AccountsContainer transactions={this.state.transactions} accounts={this.state.accounts} />
			budget = <Budget totalSpent={this.getTotalSpent()} transactions={this.state.transactions} />
			stats = <Statistics transactions={this.state.transactions} />
		}

		return (
			<div className='home'>

				<div className='home--btns'>
					<button className='home--btns__blue' onClick={this.addAccount.bind(this)}>Add Accounts</button>
					<button className='home--btns__green' onClick={this.getTransactions.bind(this)}>Get Transactions</button>
				</div>

				{budget}
				{accountsContainer}
				{stats}

				<div className='home--error'>
					<p>Please first link an account</p>
				</div>

			</div>
		);
	}
}

export default Home;
