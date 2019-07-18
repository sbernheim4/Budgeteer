import axios from 'axios';
import React, { Component } from "react";

import NetworthTable from './NetworthTable/NetworthTable.jsx';

import './networth.scss';

export default class Networth extends Component {

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
		this.storeDisplayNames = this.storeDisplayNames.bind(this);

	}

	componentWillReceiveProps(nextProps) {
		this.getRecurringPayments(nextProps.transactions);
	}

	async componentDidMount() {

		await this.getDisplayNames();

		let data;

		if (window.sessionStorage.getItem("balance")) {

			data = window.sessionStorage.getItem("balance");
			data = JSON.parse(data);

		} else {

			data = await axios.get('/plaid-api/balance');
			data = data.data
			console.log(data);

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

	storeDisplayNames(serializedDisplayNames) {

		const displayNames = new Map();

		serializedDisplayNames.forEach( (val) => {

			displayNames.set(val[0], val[1]);

		});

		this.setState({
			displayNames: displayNames
		});

	}

	async getDisplayNames() {

		let serializedDisplayNames = await axios.get("/user-info/display-names");
		serializedDisplayNames = JSON.parse(serializedDisplayNames.data);

		this.storeDisplayNames(serializedDisplayNames);

	}

	getRecurringPayments(transactions = []) {

		let duplicates = new Set();

		transactions.forEach( (val) => {

			let numOccurances = 0;

			transactions.forEach(secondVal => {

				if (JSON.stringify(val) === JSON.stringify(secondVal)) {
					numOccurances += 1;
				}

			});

			if (numOccurances > 1) {

				// TODO Change the 1 to the minimum number of times you want the number of
				// occurances to be before its considered a recurring payment.

				// TODO Should also work to check that the payment has been made in the past two
				// most recent months (NOT INCLUDING THE CURRENT MONTH)

				const duplicateExpense = JSON.stringify(val);

				duplicates.add(duplicateExpense);

			}

		});

		const recurringPayments = Array.from(duplicates);

		this.setState({
			recurringPayments: recurringPayments
		});
	}

	render() {

		{/*
		let recurringPayments;

		if (this.state.recurringPayments.length === 0) {
			recurringPayments = <p>No Recurring Payments Found</p>
		} else {
			recurringPayments = <ul> this.state.recurringPayments.map(val => <li>val.name</li>) </ul>
		}
		*/}

		let networthTable;

		if (this.state.loading) {

            networthTable = <div className="networth--loading">
                                <h1>Hang tight, getting your data from the cloud</h1>
                                <img src='/loading-gifs/loading-three.gif' alt='loading' />
                            </div>
		} else {

			networthTable = <NetworthTable
								networth={this.state.networth}
								displayNames={this.state.displayNames}
								accountBalances={this.state.accountBalances}
							/>

		}

		return (
			<div className='networth'>

				{networthTable}

				{/*
				<div className='networth--recurring-payments'>

					<h2>Recurring Payments</h2>
					<hr />
					{recurringPayments}

				</div>
				*/}

			</div>
		)
	}
}
