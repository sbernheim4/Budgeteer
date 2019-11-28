import axios from 'axios';
import React, { Component } from 'react';
import differenceInDays from 'date-fns/differenceInDays'

import SavingsTable from './SavingsTable/SavingsTable.jsx';

import './savings.scss';

export default class Savings extends Component {

	constructor(props) {

		super(props);

		this.state = {
			savings: 0,
			accountBalances: [],
			loading: true
		};

		this.institutionNames = [];
		this.displayNames = new Map();
		this.cacheKeyPrefix = 'budgeteer--savings';

		this.getDisplayNames = this.setDisplayNames.bind(this);
		this.getInstitutionIds = this.setInstitutionIds.bind(this);

	}

	isLocalStorageStale() {

		const serializedEntryTime = window.localStorage.getItem(`${this.cacheKeyPrefix}--entryTime`);
		const entryTime = new Date(serializedEntryTime);
		const now = new Date();
		const timeElapsedInDays = differenceInDays(now, entryTime);
		const thresholdInDays = 1;

		return timeElapsedInDays > thresholdInDays;

	}

	async getSavingsDataFromServer() {

		const savingsDataRequest = await axios.get('/plaid-api/balance');
		const savingsData = savingsDataRequest.data;

		if (savingsData.Error) {

			const keyAndEnv = await axios.get('/plaid-api/key-and-env');

			const plaid = Plaid.create({
				apiVersion: 'v2',
				clientName: 'Budgeteer',
				env: keyAndEnv.data.env,
				product: ['balance'],
				key: keyAndEnv.data.publicKey,
				token: savingsData.publicToken,
				onSuccess: function(public_token) {
					console.log('Update of Account successful');
				}
			});

			plaid.open();
		}

		const { totalSavings, arrayOfObjects } = savingsData;

		return {
			totalSavings,
			bankInfo: arrayOfObjects
		}

	}

	cacheSavingsData(totalSavings, bankInfo) {

		const serializedBankInfo = JSON.stringify(bankInfo);

		window.localStorage.setItem(`${this.cacheKeyPrefix}--totalSavings`, totalSavings);
		window.localStorage.setItem(`${this.cacheKeyPrefix}--arrayOfInstitutionInfo`, serializedBankInfo);
		window.localStorage.setItem(`${this.cacheKeyPrefix}--entryTime`, new Date());

	}

	async componentDidMount() {

		await this.setDisplayNames();
		await this.setInstitutionIds();

		const serializedTotalSavings = window.localStorage.getItem(`${this.cacheKeyPrefix}--totalSavings`);
		const serializedBankInfo = window.localStorage.getItem(`${this.cacheKeyPrefix}--arrayOfInstitutionInfo`);

		if (!this.isLocalStorageStale() && serializedBankInfo !== 'undefined' && serializedTotalSavings !== 'undefined') {

			const totalSavings = new Number(serializedTotalSavings);
			const bankInfo = JSON.parse(serializedBankInfo);

			this.setState({
				savings: totalSavings,
				accountBalances: bankInfo,
				loading: false
			});

		} else {

			const savingsData = await this.getSavingsDataFromServer();
			const { totalSavings, bankInfo } = savingsData;

			this.setState({
				savings: totalSavings,
				accountBalances: bankInfo,
				loading: false
			});

			this.cacheSavingsData(totalSavings, bankInfo);

		}

	}

	async setDisplayNames() {

		const serializedDisplayNamesRequest = await axios.get('/user-info/display-names');
		const serializedDisplayNames = serializedDisplayNamesRequest.data;
		const displayNames = JSON.parse(serializedDisplayNames);
		const displayNamesMap = new Map();

		if (Object.keys(displayNames).length > 0) {
			displayNames.forEach((val) => {
				displayNamesMap.set(val[0], val[1]);
			});
		}

		this.displayNames = displayNamesMap;

	}

	async setInstitutionIds() {

		const linkedBanksRequest = await axios.get('/plaid-api/linked-accounts');
		const linkedBanks = linkedBanksRequest.data.banks;

		this.institutionNames = linkedBanks;

	}

	render() {

		return (

			<div className='networth'>

				<SavingsTable
					savings={this.state.savings}
					displayNames={this.displayNames}
					accountBalances={this.state.accountBalances}
					institutionNames={this.institutionNames}
				/>

			</div>

		);

	}

}
