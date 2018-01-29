import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "../scss/navbar.scss";

class Navbar extends Component {
	render() {
		return (
			<nav className='navbar'>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/accounts'>Accounts</Link></li>
					<li><Link to='/statistics'>Statistics</Link></li>
					<li><Link to='/networth'>Networth</Link></li>
				</ul>
			</nav>
		);
	}
}

export default Navbar;
