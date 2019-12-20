import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import differenceInDays from 'date-fns/differenceInDays'

import { updateBankInfo } from './../redux/actions/savings';
import { storeDisplayNames } from './../redux/actions/app';

import SavingsTable from './SavingsTable/SavingsTable.jsx';

import './savings.scss';

class Savings extends Component {

	constructor(props) {

		super(props);

		this.state = {
			accountBalances: [],
			institutionNames: [],
			loading: true,
			savings: 0
		};

		this.cacheKeyPrefix = 'budgeteer--savings';

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
				onSuccess: function() {
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

	async storeNewChartData() {

		if (!this.bankInfo) return;

		const serializedBankInfo = JSON.stringify(this.bankInfo);

		await axios({
			method: 'post',
			url: '/savings/data',
			data: serializedBankInfo,
			headers: {
				'Content-Type': 'application/json'
			}
		});

	}

	async componentDidMount() {

		this.props.getDisplayNames();

		const linkedBanks = await this.setInstitutionIds();
		const savingsData = await this.getSavingsData();

		const { savings, accountBalances, loading } = savingsData;

		this.setState({
			institutionNames: linkedBanks,
			savings,
			loading
		});

		this.props.updateBankInfo(accountBalances);

	}

	async getSavingsData() {

		const serializedTotalSavings = window.localStorage.getItem(`${this.cacheKeyPrefix}--totalSavings`);
		const serializedBankInfo = window.localStorage.getItem(`${this.cacheKeyPrefix}--arrayOfInstitutionInfo`);

		if (!this.isLocalStorageStale() && serializedBankInfo !== 'undefined' && serializedTotalSavings !== 'undefined') {

			const totalSavings = new Number(serializedTotalSavings);
			const bankInfo = JSON.parse(serializedBankInfo);

			return {
				savings: totalSavings,
				accountBalances: bankInfo,
				loading: false
			}

		} else {

			const savingsData = await this.getSavingsDataFromServer();
			const { totalSavings, bankInfo } = savingsData;

			this.cacheSavingsData(totalSavings, bankInfo);
			this.bankInfo = bankInfo;

			return {
				savings: totalSavings,
				accountBalances: bankInfo,
				loading: false
			};

		}
	}

	async setInstitutionIds() {

		const linkedBanksRequest = await axios.get('/plaid-api/linked-accounts');
		const linkedBanks = linkedBanksRequest.data.banks;

		return linkedBanks;

	}

	render() {

		return (

			<div className='networth'>
				<SavingsTable
					savings={this.state.savings}
					institutionNames={this.state.institutionNames}
					storeNewChartData={this.storeNewChartData}
				/>
			</div>

		);

	}

}

const mapStateToProps = (state) => {

	return {
		bankInfo: state.bankInfo,
	};

};

const mapDispatchToProps = (dispatch) => {
	return {
		updateBankInfo: (newBankInfo) => dispatch(updateBankInfo(newBankInfo)),
		getDisplayNames: () => dispatch(storeDisplayNames())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Savings);
