import { AppActions } from './../actions/app';

export default function appReducer (state, action) {

	switch (action.type) {
		case AppActions.STORE_TRANSACTIONS:
			return storeData(state, action, AppActions.STORE_TRANSACTIONS);
		default:
			return {}
	}
}

function storeData (state, action, name) {

	const { payload } = action;

	return {
		[name]: payload
	};

}

