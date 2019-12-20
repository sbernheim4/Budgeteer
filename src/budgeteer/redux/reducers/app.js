import { AppActions } from './../actions/app';

export default function appReducer(state, action) {

	switch (action.type) {
		case AppActions.STORE_TRANSACTIONS:
			return storeData(state, action, AppActions.STORE_TRANSACTIONS);
		case AppActions.STORE_ACCOUNTS:
			return storeData(state, action, AppActions.STORE_ACCOUNTS);
		default:
			return state ? state : null;
	}
}

function storeData(state, action, name) {

	const { payload } = action;

	const localState = {
		[name]: payload
	};

	const newState = Object.assign({}, state, localState);

	return newState;
}
