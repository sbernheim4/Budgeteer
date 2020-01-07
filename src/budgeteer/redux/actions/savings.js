import axios from 'axios';
import { isSameDay } from 'date-fns';

export const SavingsActions = {
	UPDATE_BANK_INFO: 'bankInfo',
	STORE_SAVINGS_CHART_DATA: 'chartData'
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

		const historicalChartData = downloadHistoricalData(institutionId);

		// TODO: Merge historicalChartData with newDataPoint IFF newDataPoint has
		// not yet been uploaded to the db
		dispatch({
			type: SavingsActions.STORE_SAVINGS_CHART_DATA,
			payload: {
				[institutionId]: historicalChartData
			}
		});

		const bankInfo = state.savings.bankInfo;

		await conditionallyUploadNewDataPoint(bankInfo, historicalChartData);

	};

	async function conditionallyUploadNewDataPoint(bankInfo, historicalChartData) {

		const newDataPoint = bankInfo.find(val => val.institutionId === institutionId);

		if (historicalChartData.length === 0) {
			return await uploadNewDataPoint(newDataPoint);
		}

		const today = new Date();
		const mostRecentDataPoint = historicalChartData[historicalChartData.length - 1].name;
		const mostRecentDataPointDate = new Date(mostRecentDataPoint);

		if (!isSameDay(mostRecentDataPointDate, today) && newDataPoint) {
			return await uploadNewDataPoint(newDataPoint);
		}

	}

	async function uploadNewDataPoint(newDataPoint) {

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

	async function downloadHistoricalData(institutionId) {

		const historicalDataRequest = await axios({
			method: 'get',
			url: `/savings/data?id=${institutionId}`
		});

		const { data } = historicalDataRequest;

		const sortedChartData = data.map(dataPoint => {

			const { date: dateString, institutionalBalance } = dataPoint;

			const date = new Date(dateString);
			const displayDate = date.getMonth() + 1 +
				"/" + date.getDate() +
				"/" + date.getFullYear();

			return {
				name: displayDate,
				Balance: institutionalBalance
			}

		}).sort((a, b) => {
			return new Date(a.name) - new Date(b.name);
		});

		return sortedChartData;

	}

}

