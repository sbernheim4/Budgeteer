import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore([thunk]);

const initialState = {
	app: {
		transactions: [],
		displayNames: [],
		accounts: []
	},
	savings: {
		bankInfo: [],
		chartData: []
	},
	statistics: {
		monthlyBudget: 0
	}
};

const store = mockStore(initialState);

export default store;
