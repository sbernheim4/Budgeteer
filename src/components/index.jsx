import React from 'react';
import ReactDOM from 'react-dom';

// Global Style Sheet
import '../scss/index.scss';

import Home from './Home.jsx';
import Navbar from './Navbar.jsx';

ReactDOM.render(<Home />, document.querySelector('#Home'));
ReactDOM.render(<Navbar />, document.querySelector('#nav'));
