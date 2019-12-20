export const AppActions = {
	STORE_TRANSACTIONS: 'transactions'
};

export function storeTransactionsInRedux(transactions) {

	return {
		type: AppActions.STORE_TRANSACTIONS,
		payload: transactions
	};

};
