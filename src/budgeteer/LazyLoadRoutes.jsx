/* Export each route component here that will be lazy loaded. This means the js file for that route
 * will not be loaded until the user navigates to that route. The exported values here are imported
 * in the Routes/index.jsx
 */
/* `loader` refers to the component that will be loaded while `loading` refers to a component to
 * display while the component is loading
 */

import React from 'react';
import Loadable from 'react-loadable';

export const Navbar = Loadable({
	loader: () => import('./Navbar/Navbar.jsx'),
	loading: () => <div>loading...</div>
});

export const Home = Loadable({
	loader: () => import('./Home/Home.jsx'),
	loading: () => <div>loading...</div>
});

export const Networth = Loadable({
    loader: () => import('./Networth/Savings.jsx'),
	loading: () => <div>Loading...</div>
});

export const Settings = Loadable({
	loader: () => import('./Settings/Settings.jsx'),
	loading: () => <div>Loading...</div>
});

export const Statistics = Loadable({
	loader: () => import('./Statistics/Statistics.jsx'),
	loading: () => <div>Loading...</div>
});
export const AccountsContainer = Loadable({
	loader: () => import('./AccountsContainer/AccountsContainer.jsx'),
	loading: () => <div>Loading...</div>
});
