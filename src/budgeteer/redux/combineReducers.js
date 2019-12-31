import { combineReducers } from "redux";
import savingsReducer from './reducers/savings'
import appReducer from './reducers/app';
import statisticsReducer from './reducers/statistics';

export default combineReducers({
	app: appReducer,
	savings: savingsReducer,
	statistics: statisticsReducer
});

