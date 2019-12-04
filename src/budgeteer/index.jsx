import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import configureStore from './redux/configureStore';

import './scss/reset.scss';

import App from './App/App.jsx';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename='/budgeteer'>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
