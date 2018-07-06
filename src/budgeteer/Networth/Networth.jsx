import axios from 'axios';
import React, { Component } from "react";
import helpers from "../helpers.js";

import './networth.scss';

class Networth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			total: 0, // Keep track of total net worth
			accountBalances: [], // Map of account name to its balance
			recurringPayments: [], // Keep track of recurring costs like Spotify or Netflix etc
			loading: true
		}
	}

	componentWillReceiveProps(nextProps) {

		let duplicates = new Set();
		nextProps.transactions.forEach(val => {
			let numOccurances = 0;

			nextProps.transactions.forEach(secondVal => {
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

		let recurringPayments = [];
		duplicates.forEach(payment => {
			recurringPayments.push(JSON.parse(payment));
		});

		this.setState({
			recurringPayments: recurringPayments
		});

	}

	async componentDidMount() {

		let data;

		// Keep the data stored in the client's browser for the duration of the session
		if (window.sessionStorage.getItem("balance")){

			data = window.sessionStorage.getItem("balance");
			data = JSON.parse(data);

		} else {

			data = await axios({
				method: "POST", 
				url: '/plaid-api/balance'
			});
			data = data.data

			window.sessionStorage.setItem("balance", JSON.stringify(data));
		}

		this.setState({
			total: data.networth,
			accountBalances: data.maps,
			loading: false
		});
	}

	render () {
		let recurringPayments;

		if (this.state.recurringPayments.length === 0) {
			recurringPayments = <p>No Recurring Payments Found</p>
		} else {
			recurringPayments = <ul> this.state.recurringPayments.map(val => <li>val.name</li>) </ul>
		}

		let netWorthChart;
		if (this.state.loading) {
			netWorthChart = <div className="networth--loading"><h1>Hang tight, getting your data from the cloud</h1><img src='/loading-gifs/loading-three.gif' alt='loading' /></div>
		} else {
			netWorthChart = (<table>
					<thead>
						<tr>
							<th>Account Name</th>
							<th>Amount</th>
						</tr>
					</thead>

					<tbody>
						{this.state.accountBalances.map( (keyName, index) => (
							Object.keys(keyName).map( (acctName, index) => (
							<tr key={index} className='networth--entry'>
								<td className='acct-name'>{acctName}</td>
								<td className='acct-value'>{keyName[acctName]}</td>
							</tr>
							))
						))}
						<tr>
							<td className='acct-name'>Total</td>
							<td className='acct-value'>${this.state.total}</td>
						</tr>
					</tbody>
				</table>)
		}

		return (
			<div className='networth'>
				{netWorthChart}

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
