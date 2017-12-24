import React, { Component } from 'react';
import '../scss/navbar.scss';

class Navbar extends Component {
	render() {
		return (

			<div className='navbar'>
				<p>Home</p>
				<p>Sign Up</p>
				<p>Sign In</p>
			</div>
		);
	}
}

export default Navbar;
