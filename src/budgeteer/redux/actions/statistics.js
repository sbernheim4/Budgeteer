import axios from 'axios';

export const StatisticsActions = {
	GET_MONTHLY_BUDGET: 'monthlyBudget',
	UPDATE_MONTHLY_BUDGET: 'monthlyBudget'
}

export function getMonthlyBudget() {

	return async (dispatch, getState) => {

		const state = getState();

		if (state.statistics.monthlyBudget !== 0) {
			return;
		}

		let monthlyBudgetFromStorage;

		try {
			monthlyBudgetFromStorage = JSON.parse(localStorage.getItem('monthlyBudget'));
		} catch (error) {
			// Swallow the error if it doesn't exist in localStorage
		}

		if (monthlyBudgetFromStorage) {

			return dispatch({
				type: StatisticsActions.GET_MONTHLY_BUDGET,
				payload: monthlyBudgetFromStorage
			});

		}

		try {

			const monthlyBudgetRequest = await axios.get('/user-info/monthly-budget');
			const { monthlyBudget } = monthlyBudgetRequest.data;

			localStorage.setItem('monthlyBudget', monthlyBudget);

			return dispatch({
				type: StatisticsActions.GET_MONTHLY_BUDGET,
				payload: monthlyBudget
			});

		} catch (err) {

			return 0;

		}

	}

}

export function updateMonthlyBudget(newMonthlyBudget) {

	return async (dispatch) => {

		await axios({
			method: 'POST',
			url: '/user-info/monthly-budget',
			data: {
				monthlyBudget: newMonthlyBudget
			}
		});

		localStorage.setItem('monthlyBudget', newMonthlyBudget);

		return dispatch({
			type: StatisticsActions.UPDATE_MONTHLY_BUDGET,
			payload: newMonthlyBudget
		});

	}

}
