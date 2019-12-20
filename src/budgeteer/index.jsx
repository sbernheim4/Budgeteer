import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import configureStore from './redux/configureStore';

import './scss/reset.scss';

import App from './App/App.jsx';

const initialState = {
	app: {
		transactions: [],
		displayNames: [],
		accounts: []
	},
	savings: {
		bankInfo: []
	}
};

const store = configureStore(initialState);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename='/budgeteer'>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
