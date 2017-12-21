import React, { Component } from 'react';
import TransactionContainer from '../TransactionContainer/TransactionContainer.jsx'
import Transaction from '../Transaction/Transaction.jsx'

import '../../scss/home.scss';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			transaction: [{
				name: "sam",
				amount: 20,
				date: "12-21-17"
			}]
		};
	}

	// 1. Make request to the server to get variables and have the server return JSON
	// 	PLAID_ENV
	// 	PLAID_PUBLIC_KEY


	componentWillMount () {
		fetch('http://localhost:5000/plaid-api/key-and-env')
		.then(response => {
			return response.json();
		}).then(res => {
			this.setState( {env: res.env, publicKey: res.publicKey} );
			return res;
		}).then( res => {
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

	componentDidMount() {

	}

	addAccount() {
		this.state.handler.open();
	}

	getTransactions() {
		$.post('/plaid-api/transactions', data => {
			this.setState({transaction: data.transactions});
		});


	}

	renderContainer() {

	}

	render() {
		return (
			<div className='home'>

			<button onClick={this.addAccount.bind(this)}>Add Accounts</button>
			<button onClick={this.getTransactions.bind(this)}>Get Transactions</button>

			<TransactionContainer transactions={this.state.transaction} />

			</div>
			);
	}
}

export default Home;
