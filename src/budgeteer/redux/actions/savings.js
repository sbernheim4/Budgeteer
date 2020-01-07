import axios from 'axios';
import { isSameDay } from 'date-fns';

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

		const historicalSavingsData = await downloadHistoricalData(institutionId);

		dispatch({
			type: SavingsActions.STORE_SAVINGS_CHART_DATA,
			payload: {
				[institutionId]: historicalSavingsData
			}
		});

		const bankInfo = state.savings.bankInfo;

		conditionallyUploadNewData(historicalSavingsData, bankInfo);

	};

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

	async function conditionallyUploadNewData(historicalSavingsData, bankInfo) {

		if (historicalSavingsData.length === 0) {
			return await uploadData(bankInfo);
		}

		const today = new Date();
		const mostRecentDataPoint = historicalSavingsData[historicalSavingsData.length - 1].name;
		const mostRecentDataPointDate = new Date(mostRecentDataPoint);

		if (!isSameDay(mostRecentDataPointDate, today) && bankInfo ) {
			return await uploadData(bankInfo);
		}

	}

	async function uploadData(bankInfo) {

		const serializedBankInfo = JSON.stringify(bankInfo);

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
