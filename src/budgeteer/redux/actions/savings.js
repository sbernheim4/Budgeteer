import axios from 'axios';
import { isSameDay, isAfter } from 'date-fns';

export const SavingsActions = {
	UPDATE_BANK_INFO: 'bankInfo',
	STORE_SAVINGS_CHART_DATA: 'STORE_SAVINGS_CHART_DATA'
};

export const updateBankInfo = (newBankInfo) => {

	return {
		type: SavingsActions.UPDATE_BANK_INFO,
		payload: newBankInfo
	};

};

export const getSavingsChartData = (institutionId) => {

	return async (dispatch, getState) => {

		const state = getState();

		if (state.savings[institutionId]) {
			return;
		}

		const historicalSavingsData = await downloadHistoricalData();

		dispatch({
			type: SavingsActions.STORE_SAVINGS_CHART_DATA,
			payload: {
				[institutionId]: historicalSavingsData
			}
		});

		const institutionInfo = state.savings.bankInfo.find(institutionInfo => {
			return institutionInfo.institutionId === institutionId;
		});

		await conditionallyUploadNewData(historicalSavingsData, institutionInfo);

	};

	async function downloadHistoricalData() {

		const historicalDataRequest = await axios({
			method: 'get',
			url: `/savings/data?id=${institutionId}`
		});

		const { data } = historicalDataRequest;

		const chartData = data.map(dataPoint => {

			const { date: dateString, institutionalBalance } = dataPoint;

			const date = new Date(dateString);
			const displayDate = date.getMonth() + 1 +
				"/" + date.getDate() +
				"/" + `'${date.getFullYear()}`.slice(0,3);

			return {
				balance: institutionalBalance,
				date,
				name: displayDate
			}

		}).sort((a, b) => {
			return a.date - b.date;
		});

		return chartData;

	}

	async function conditionallyUploadNewData(historicalSavingsData, newSavingsData) {

		if (historicalSavingsData.length === 0) {
			return await uploadData(newSavingsData);
		}

		const today = new Date();
		let mostRecentDataPoint = historicalSavingsData[0];

		for (let i = 1; i < historicalSavingsData.length; i++) {

			let currentVal = historicalSavingsData[i];

			if (isAfter(currentVal.date, mostRecentDataPoint.date)) {
				mostRecentDataPoint = currentVal;
			}

		}

		const mostRecentDataPointDate = new Date(mostRecentDataPoint.date);

		if (!isSameDay(mostRecentDataPointDate, today) && newSavingsData ) {
			return await uploadData(newSavingsData);
		}

	}

	async function uploadData(newDataPoint) {

		const serializedBankInfo = JSON.stringify(newDataPoint);

		try {

			await axios({
				method: 'post',
				url: '/savings/data',
				data: serializedBankInfo,
				headers: {
					'Content-Type': 'application/json'
				}
			});

		} catch (error) {

			console.log(error);

		}
	}

}
