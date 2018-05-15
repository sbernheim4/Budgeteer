import React, { Component } from "react";
import axios from 'axios';

import './settings.scss';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
	faTimes
} from '@fortawesome/fontawesome-free-solid';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			linkedBanks: []
		}
	}

	async componentDidMount() {

		let linkedBanks = await axios.post('/plaid-api/linked-accounts');
		this.setState({
			linkedBanks: linkedBanks.data.accounts
		})
	}

	async removeAccount(e) {
		let bankName = e.target.parentNode.querySelector('h2').innerText;

		let index;
		this.state.linkedBanks.map( (bank, i) => {
			if (bank === bankName) {
				index = i;
			}
		});

		let result;
		try {
			result = await axios.post('/plaid-api/remove-account', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: {
					bankIndex: index,
					bankName: this.state.linkedBanks[index]
				}
			});

			this.setState({
				linkedBanks: [...this.state.linkedBanks.slice(0, index), ...this.state.linkedBanks.slice(index + 1)]
			})
		} catch(err) {
			console.log("DISPLAY ERROR MESSAGE");
			console.log(err.ERROR);
			//const alertMessage = document.querySelector('.app-error');
			//alertMessage.innerText = "Error: " + err.response.status + "\n" + err.response.data.status;
			//alertMessage.classList.add('app-error__display');

			//setTimeout(() => {
				//alertMessage.classList.remove('app-error__display')
			//}, 4000)
		}
	}

	async rotateAccessTokens() {
		let returnVal = await axios.post('/plaid-api/rotate-access-tokens');

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
				<h1>Linked Accounts</h1>
				{this.state.linkedBanks.map( (bank, index) =>
					<div key={index} className='settings--linked-accounts'>
						<h2>{bank}</h2>
						<button onClick={(e) => this.removeAccount(e)}>Remove</button>
					</div>
				)}

				<div className="settings--rotate-tokens">
					<p>If you think your account has been compromised, click the button below to delete and generate new access tokens</p>
					<button onClick={this.rotateAccessTokens}>Rotate Access Tokens</button>
				</div>
			</section>
		);
	}
}

export default Settings;
