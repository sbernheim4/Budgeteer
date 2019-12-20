import { SavingsActions } from './../actions/savings';

function updateBankInfo(state, action) {

	const { payload } = action;

	return {
		bankInfo: payload
	};

}

export default function savingsReducer(state, action) {

	switch (action.type) {
		case SavingsActions.UPDATE_BANK_INFO:
			return updateBankInfo(state, action);
		default:
			return {
				bankInfo: []
			}
	}
}
