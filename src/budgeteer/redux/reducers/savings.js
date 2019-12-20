import { SavingsActions } from './../actions/savings';
import generalizedReducer from './generalizedReducer';

export default function savingsReducer(state, action) {

	switch (action.type) {
		case SavingsActions.UPDATE_BANK_INFO:
			return generalizedReducer(state, action, SavingsActions.UPDATE_BANK_INFO);
		default:
			return state ? state : null;
	}
}
