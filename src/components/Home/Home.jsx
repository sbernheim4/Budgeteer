import React, { Component } from 'react';

import '../../scss/home.scss';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {};
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
					$.post('/get_access_token', {
						public_token: public_token
					});
				}
			});
			this.setState({handler: plaid});
		}).catch(err => console.error(err));
	}

	componentDidMount() {

	}

	addAccount() {
		this.state.handler.open();
		console.log('account added');
	}

	getTransactions() {
		console.log('transactions received');
	}

	render() {
		return (
			<div className='home'>

			<p>HI. This line is a react component. Isn't that neat</p>

			<button onClick={this.addAccount.bind(this)}>Add Accounts</button>
			<button onClick={this.getTransactions.bind(this)}>Get Transactions</button>
			</div>
			);
	}
}

export default Home;
