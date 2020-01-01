import { AppActions } from './../actions/app';

import generalizedReducer from './generalizedReducer';

export default function appReducer(state, action) {

	if (action.type && Object.values(AppActions).includes(action.type)) {
		return generalizedReducer(state, action, action.type);
	} else {
		return state ? state : null;
	}

}
