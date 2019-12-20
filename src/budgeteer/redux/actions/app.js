import axios from 'axios';

export const AppActions = {
	STORE_TRANSACTIONS: 'transactions',
	STORE_ACCOUNTS: 'accounts',
	STORE_DISPLAY_NAMES: 'displayNames'
};

export function storeTransactionsInRedux(transactions) {

	return {
		type: AppActions.STORE_TRANSACTIONS,
		payload: transactions
	};

};

export function storeAccountsInRedux(accounts) {

	return {
		type: AppActions.STORE_ACCOUNTS,
		payload: accounts
	}

}

export function storeDisplayNames() {

	return async (dispatch, getState) => {

		const state = getState();

		if (state.app.displayNames.length > 0) {
			return;
		}

		const serializedDisplayNamesRequest = await axios.get('/user-info/display-names');
		const serializedDisplayNames = serializedDisplayNamesRequest.data;
		const displayNames = JSON.parse(serializedDisplayNames);
		const displayNamesMap = new Map();

		if (Object.keys(displayNames).length > 0) {
			displayNames.forEach((val) => {
				displayNamesMap.set(val[0], val[1]);
			});
		}

		return dispatch({
			type: AppActions.STORE_DISPLAY_NAMES,
			payload: displayNames
		});

	};

}
