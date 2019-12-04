import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers';

import './scss/reset.scss';

import App from './App/App.jsx';

const store = createStore(rootReducer)

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename='/budgeteer'>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
