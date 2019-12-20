import { SavingsActions } from './../actions/savings';

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

function updateBankInfo(state, action) {

	const { payload } = action;

	const localState = {
		bankInfo: payload
	}

	const newState = Object.assign({}, state, localState);

	return newState;

};
