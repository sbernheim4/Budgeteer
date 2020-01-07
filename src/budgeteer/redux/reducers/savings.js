import { SavingsActions } from './../actions/savings';
import generalizedReducer from './generalizedReducer';

export default function savingsReducer(state, action) {

	switch (action.type) {
		case SavingsActions.UPDATE_BANK_INFO:
			return generalizedReducer(state, action, SavingsActions.UPDATE_BANK_INFO);
		case SavingsActions.STORE_SAVINGS_CHART_DATA:
			const { payload } = action;
			const updatedSavingsChartData = Object.assign({}, state.chartData, payload)
			const newState = Object.assign({}, state, updatedSavingsChartData);

			return newState;
		default:
			return state ? state : null;
	}
}
