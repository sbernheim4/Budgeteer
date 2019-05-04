import axios from 'axios';
import React, { Component } from "react";
import { numberWithCommas, formatAmount, toTitleCase, isNumber } from "../helpers.js";

import './networth.scss';

class Networth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			networth: 0, // Keep track of total net worth
			accountBalances: [], // Map of account name to its balance
			recurringPayments: [], // Keep track of recurring costs like Spotify or Netflix etc
			loading: true
		}

		this.getDisplayNames = this.getDisplayNames.bind(this);
		this.getRecurringPayments = this.getRecurringPayments.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.getRecurringPayments(nextProps.transactions);
	}

	async componentDidMount() {
		await this.getDisplayNames();

		let data;

		// Keep the data stored in the client's browser for the duration of the session
		if (window.sessionStorage.getItem("balance")) {
			data = window.sessionStorage.getItem("balance");
			data = JSON.parse(data);
		} else {

			data = await axios.get('/plaid-api/balance');
			data = data.data

			if (data.Error) {
				let keyAndEnv = await axios.get('/plaid-api/key-and-env');

				const plaid = Plaid.create({
					apiVersion: 'v2',
					clientName: 'Budgeteer',
					env: keyAndEnv.data.env,
					product: ['balance'],
					key: keyAndEnv.data.publicKey,
					token: data.publicToken,
					onSuccess: function (public_token) {
						console.log("Update of Account successful");
					}
				});

				plaid.open();
			}

			window.sessionStorage.setItem("balance", JSON.stringify(data));
		}

		this.setState({
			networth: data.networth,
			accountBalances: data.maps,
			loading: false
		});
	}

	async getDisplayNames() {

		// Pull serialized version of display names from the server
		let serializedDisplayNames = await axios.get("/user-info/display-names");
		serializedDisplayNames = JSON.parse(serializedDisplayNames.data);

		const displayNames = new Map();

		// Convert response from server into a proper map object
		serializedDisplayNames.forEach(val => {
			displayNames.set(val[0], val[1]);
		});

		// Update state
		this.setState({
			displayNames: displayNames
		})
	}

	getRecurringPayments(transactions = []) {
		let duplicates = new Set();

		transactions.forEach(val => {
			let numOccurances = 0;

			transactions.forEach(secondVal => {
				if (JSON.stringify(val) === JSON.stringify(secondVal)) {
					numOccurances += 1;
				}
			});

			// TODO: Change the 1 to the minimum number of times you want the number of
			// occurances to be before its considered a recurring payment.
			//
			// Should also work to check that the payment has been made in the past two
			// most recent months (NOT INCLUDING THE CURRENT MONTH)
			if (numOccurances > 1) {
				duplicates.add(JSON.stringify(val));
			}
		});

		const recurringPayments = Array.from(duplicates);

		this.setState({
			recurringPayments: recurringPayments
		});
	}

	render() {
		let recurringPayments;

		if (this.state.recurringPayments.length === 0) {
			recurringPayments = <p>No Recurring Payments Found</p>
		} else {
			recurringPayments = <ul> this.state.recurringPayments.map(val => <li>val.name</li>) </ul>
		}

		let networthTable;
		if (this.state.loading) {
			networthTable = <div className="networth--loading"><h1>Hang tight, getting your data from the cloud</h1><img src='/loading-gifs/loading-three.gif' alt='loading' /></div>
		} else {
			networthTable = (<table>
				<thead>
					<tr>
						<th>Account Name</th>
						<th>Amount</th>
					</tr>
				</thead>

				<tbody>
					{this.state.accountBalances.map((keyName, index) => (
						Object.keys(keyName).map((acctName, index) => (
							<tr key={index} className='networth--entry'>
								<td className='acct-name'>{this.state.displayNames.get(acctName)}</td>
								<td className='acct-value'>{isNumber(keyName[acctName]) === true ? '$' + numberWithCommas(formatAmount(keyName[acctName])) : "N/A"}</td>
							</tr>
						))
					))}
					<tr>
						<td className='acct-name'>Total</td>
						<td className='acct-value'>${numberWithCommas(formatAmount(this.state.networth))}</td>
					</tr>
				</tbody>
			</table>)
		}

		return (
			<div className='networth'>
				{networthTable}

				<div className='networth--recurring-payments'>
					<h2>Recurring Payments</h2>
					<hr />
					{recurringPayments}
				</div>

			</div>
		)
	}
}

export default Networth
