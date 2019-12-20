import { AppActions } from './../actions/app';

export default function appReducer (state, action) {

	switch (action.type) {
		case AppActions.STORE_TRANSACTIONS:
			return storeData(state, action, AppActions.STORE_TRANSACTIONS);
		default:
			return {
				transactions: []
			}
	}
}

function storeData (state, action, name) {

	const { payload } = action;

	const localState = {
		[name]: payload
	};

	const newState = Object.assign({}, state, localState);

	return newState;
}
