import { combineReducers } from "redux";
import savingsReducer from './savings'
import appReducer from './app';
import statisticsReducer from './statistics';

export default combineReducers({
	app: appReducer,
	savings: savingsReducer,
	statistics: statisticsReducer
});

