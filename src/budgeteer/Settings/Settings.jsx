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
			linkedBanks: [],
			monthlyBudget: "Loading..."
		}

		this.updateMonthlyBudget = this.updateMonthlyBudget.bind(this);
	}

	async componentDidMount() {

		let linkedBanks = await axios.post('/plaid-api/linked-accounts');
		let monthlyBudget = await axios.get('/user-info/monthly-budget');

		this.setState({
			linkedBanks: linkedBanks.data.accounts,
			monthlyBudget: monthlyBudget.data.monthlyBudget
		});
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
				data: {
					bankIndex: index,
					bankName: this.state.linkedBanks[index]
				}
			});

			this.setState({
				linkedBanks: [...this.state.linkedBanks.slice(0, index), ...this.state.linkedBanks.slice(index + 1)]
			})
			window.localStorage.clear();
			window.sessionStorage.cleaar();
		} catch(err) {
			console.log("DISPLAY ERROR MESSAGE");
			console.log(err.ERROR);
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

	updateMonthlyBudget(e) {
		axios({
			method: 'POST',
			url: '/user-info/monthly-budget',
			data: {
				monthlyBudget: e.target.value.trim()
			}
		});

		this.setState({
			monthlyBudget: e.target.value.trim()
		});
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

				<form className='settings--monthly-budget'>
					<label>
						<h1>Your Monthly Budget</h1>
						<input placeholder="Loading..." type="number" name="budget" value={this.state.monthlyBudget} onChange={this.updateMonthlyBudget} />
					</label>
				</form>

				<div className="settings--rotate-tokens">
					<p>If you think your account has been compromised, click the button below to delete and generate new access tokens</p>
					<button onClick={this.rotateAccessTokens}>Rotate Access Tokens</button>
				</div>
			</section>
		);
	}
}

export default Settings;
