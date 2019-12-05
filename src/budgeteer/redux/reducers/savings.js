import { SavingsActions } from './../actions/savings';

function UPDATE_BANK_INFO(state, action) {

	const { payload } = action;

	return {
		bankInfo: payload
	};

}
const savings = (state, action) => {

	switch (action.type) {
		case SavingsActions.UPDATE_BANK_INFO:
			return UPDATE_BANK_INFO(state, action);
		default:
			return 'initial state';
	}
}

export default savings;
