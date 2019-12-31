import { StatisticsActions } from './../actions/statistics';

import generalizedReducer from './generalizedReducer';

export default function statisticsReducer(state, action) {

	if (action.type && Object.values(StatisticsActions).includes(action.type)) {
		return generalizedReducer(state, action, action.type);
	} else {
		return state ? state : null;
	}

}
