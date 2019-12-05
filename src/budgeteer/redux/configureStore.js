import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './combineReducers';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // shows dev tools in the console
        initialState,
        applyMiddleware(thunk)
    );
}
