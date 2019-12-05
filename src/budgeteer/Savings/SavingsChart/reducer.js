import axios from 'axios';

async function storeNewChartData(bankInfo) {
	if (bankInfo) return;

	const serializedBankInfo = JSON.stringify(bankInfo);

	await axios({
		method: 'post',
		url: '/savings/data',
		data: serializedBankInfo,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

function reducer(state, action){

	switch (action.type) {
		case "store-new-chart-data":
			storeNewChartData(action.payload);
			return {
				chartDataSent: 1
			}
		default:
			return {
				chartDataSent: -1
			}
	}
}

export default reducer;
