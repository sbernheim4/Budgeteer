import { AppActions } from './../actions/app';

import generalizedReducer from './generalizedReducer';

export default function appReducer(state, action) {

	switch (action.type) {
		case AppActions.STORE_TRANSACTIONS:
			return generalizedReducer(state, action, AppActions.STORE_TRANSACTIONS);
		case AppActions.STORE_ACCOUNTS:
			return generalizedReducer(state, action, AppActions.STORE_ACCOUNTS);
		case AppActions.STORE_DISPLAY_NAMES:
			return generalizedReducer(state, action, AppActions.STORE_DISPLAY_NAMES);
		default:
			return state ? state : null;
	}
}
