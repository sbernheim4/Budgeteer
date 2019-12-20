import { combineReducers } from "redux";
import savingsReducer from './reducers/savings'
import appReducer from './reducers/app';

export default combineReducers({
	app: appReducer,
	savings: savingsReducer
});

