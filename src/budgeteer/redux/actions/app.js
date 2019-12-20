export const AppActions = {
    STORE_TRANSACTIONS: 'transactions',
    STORE_ACCOUNTS: 'accounts'
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
