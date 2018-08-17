/* eslint no-undefined: "off" */

import React, { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
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
			monthlyBudget: "Loading...",
			display: false,
			message: "",
			color: "green"
		}

		this.updateInputValue = this.updateInputValue.bind(this);
		this.updateMonthlyBudget = this.updateMonthlyBudget.bind(this);
		this.displayMessage = this.displayMessage.bind(this);
	}

	async componentDidMount() {
		// Try looking in local storage first for the monthlyBudget
		let monthlyBudget = localStorage.getItem("monthlyBudget");
		if (!monthlyBudget) {
			// If that fails grab it from the server
			monthlyBudget = await axios.get('/user-info/monthly-budget');
			monthlyBudget = monthlyBudget.data.monthlyBudget;
		}

		let linkedBanks = await axios.get('/plaid-api/linked-accounts');
		this.setState({
			linkedBanks: linkedBanks.data.accounts,
			monthlyBudget: monthlyBudget
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

	updateInputValue(e) {
		const updatedMonthlyBudget = e.target.value.trim();
		// Update state value
		this.setState({
			monthlyBudget: updatedMonthlyBudget
		});
	}

	updateMonthlyBudget(e) {
		e.preventDefault();

		const updatedMonthlyBudget = document.querySelector("#monthly-budget").value;

		// Update local storage value
		localStorage.setItem("monthlyBudget", updatedMonthlyBudget);

		// Update Session/DB value
		axios({
			method: 'POST',
			url: '/user-info/monthly-budget',
			data: {
				monthlyBudget: updatedMonthlyBudget
			}
		});

		// Display a success message optimistically
		this.displayMessage("Your monthly budget was updated");
	}

	displayMessage(msg) {
		this.setState({
			message: msg,
			display: true
		});

		setTimeout(() => {
			this.setState({
				display: false,
			});
		}, 5500);
	}

	render() {

		return (

			<section className='settings'>

				<ErrorMessage
					display={this.state.display}
					text={this.state.message}
					color={this.state.color}
				/>

				<h1>Linked Accounts</h1>
				{this.state.linkedBanks.map( (bank, index) =>
					<div key={index} className='settings--linked-accounts'>
						<h2>{bank}</h2>
						<button onClick={(e) => this.removeAccount(e)}>Remove</button>
					</div>
				)}

				<form className='settings--monthly-budget' onSubmit={this.updateMonthlyBudget}>
					<label>
						<h1>Your Monthly Budget</h1>
						<input id="monthly-budget" placeholder="Loading..." type="number" name="budget" value={this.state.monthlyBudget} onChange={this.updateInputValue}/>
						<input className='submit' type='submit' value='Update' onClick={this.updateMonthlyBudget}/>
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
