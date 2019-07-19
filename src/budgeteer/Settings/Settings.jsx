/* eslint no-undefined: "off" */

import React, { Component } from 'react';

import AccountNames from './AccountNames/AccountNames.jsx';
import LinkedAccounts from './LinkedAccounts/LinkedAccounts.jsx';
import MonthlyBudget from './MonthlyBudget/MonthlyBudget.jsx';

import './settings.scss';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async removeAccount(e) {
		let bankName = e.target.parentNode.querySelector('h2').innerText;

		let index;
		this.state.linkedBanks.map((bank, i) => {
			if (bank === bankName) {
				index = i;
			}
		});

		let result;
		try {
			// result = await axios.post('/plaid-api/remove-account', {
			// 	data: {
			// 		bankIndex: index,
			// 		bankName: this.state.linkedBanks[index]
			// 	}
			// });

			this.setState({
				linkedBanks: [...this.state.linkedBanks.slice(0, index), ...this.state.linkedBanks.slice(index + 1)],
			});
			window.localStorage.clear();
			window.sessionStorage.clear();
		} catch (err) {
			console.log('DISPLAY ERROR MESSAGE');
			console.log(err.ERROR);
		}
	}

	async rotateAccessTokens() {
		// let returnVal = await axios.post('/plaid-api/rotate-access-tokens');
		//const alertMessage = document.querySelector('.app-error');
		//alertMessage.innerText = returnVal.data.result;
		//alertMessage.classList.add('app-error__display');
		//setTimeout(() => {
		//alertMessage.classList.remove('app-error__display')
		//}, 4000)
	}

	render() {
		return (
			<section className='settings'>
				<LinkedAccounts />
				<MonthlyBudget />
				<AccountNames accounts={this.props.accounts} />

				<div className='settings--rotate-tokens'>
					<p>
						If you think your account has been compromised, click the button below to delete and generate
						new access tokens
					</p>
					<button onClick={this.rotateAccessTokens}>Rotate Access Tokens</button>
				</div>
			</section>
		);
	}
}

export default Settings;
