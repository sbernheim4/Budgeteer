/* eslint no-undefined: "off" */

import React, { Component } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

import './linkedAccounts.scss';

class LinkedAccounts extends Component {

	constructor(props) {
		super(props);

		this.state = {
			linkedBanks: []
		};

		this.displayMessage = this.displayMessage.bind(this);
	}

	async componentDidMount() {
		let linkedBanks = await axios.get('/plaid-api/linked-accounts');
		linkedBanks = linkedBanks.data.banks;
		linkedBanks = Object.values(linkedBanks); // Only pull out the names of the banks, we don't care about the instituion ids
		this.setState({
			linkedBanks: linkedBanks
		});
	}

	async removeAccount(e) {
		const bankName = e.target.parentNode.querySelector('h2').innerText;

		let index;
		this.state.linkedBanks.map((bank, i) => {
			if (bank === bankName) {
				index = i;
			}
		});

		try {

			// await axios.post('/plaid-api/remove-account', {
			// 	data: {
			// 		bankIndex: index,
			// 		bankName: this.state.linkedBanks[index]
			// 	}
			// });

			this.setState({
				linkedBanks: [...this.state.linkedBanks.slice(0, index), ...this.state.linkedBanks.slice(index + 1)]
			});

			window.localStorage.clear();
			window.sessionStorage.clear();
		} catch (err) {
			console.log('DISPLAY ERROR MESSAGE');
			console.log(err.ERROR);
		}
	}

	displayMessage(msg, color) {
		this.setState({
			message: msg,
			display: true
		});

		setTimeout(() => {
			this.setState({
				display: false,
				color: color
			});
		}, 5500);
	}

	render() {
		return (
			<section className='linked-accounts'>
				<h1>Linked Banks</h1>

				<div className='linked-accounts__list'>
					{this.state.linkedBanks.map((bank, index) => (
						<div key={index} className='linked-accounts__list__account'>
							<h2>{bank}</h2>
							<button onClick={(e) => this.removeAccount(e)}>Unlink</button>
						</div>
					))}
					<FontAwesomeIcon className='linked-accounts__list__icon' icon={faArrowAltCircleDown} />
				</div>
			</section>
		);
	}
}

export default LinkedAccounts;
