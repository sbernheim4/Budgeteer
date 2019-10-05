import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	async componentDidMount() {}

	render() {
		return (
			<nav className='navbar'>

				<div className='navbar--desktop'>

					<h2>
						<Link to='/'>Budgeteer</Link>
					</h2>

					<div className='navbar--desktop--links'>
						<Link to='/login'>Sign In</Link>
					</div>

				</div>

			</nav>
		);
	}
}

export default Navbar;
