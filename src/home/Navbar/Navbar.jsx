import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "./navbar.scss";

class Navbar extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	async componentDidMount() {

	}

	render() {
		return (
			<nav className='navbar'>
				<div className='navbar--desktop'>

					<h2>Budgeteer</h2>

					<div className="navbar--desktop--links">
						<a href="#product">Product</a>
						<a href="#about">About Us</a>
						<a href="#pricing">Pricing</a>
						<a id="sign-up" href="#sign-up">Sign Up</a>
						<a id="sign-in" href="/login/facebook">Sign In</a>
					</div>
				</div>

				{/*<div className="navbar--mobile">
					<div className="navbar--mobile--header">
						<Link to='/' onClick={this.closeMenu}> <FontAwesomeIcon className="icon" icon={faHome}/> </Link>
						<h2>Budgeteer</h2>
						<FontAwesomeIcon className="icon" icon={faBars} onClick={this.toggleMenu}/>
					</div>

					<div className='navbar--mobile--links'>

						<div className="navbar--mobile--links--profile">
							<img src="http://via.placeholder.com/50x50" />
							<h3>Samuel Bernheim</h3>
						</div>

						<div className="link-container" ><FontAwesomeIcon icon={faExchangeAlt}/><Link to='/transactions' className="first" onClick={this.toggleMenu}>Your Transactions</Link></div>
						<div className="link-container" ><FontAwesomeIcon icon={faChartPie}/><Link to='/statistics' className="second" onClick={this.toggleMenu}>Your Statistics</Link></div>
						<div className="link-container" ><FontAwesomeIcon icon={faMoneyBillAlt}/><Link to='/networth' className="third" onClick={this.toggleMenu}>Your Networth</Link></div>
						<hr />
						<div className="link-container" ><FontAwesomeIcon icon={faCogs}/><Link to='/settings' className="fourth" onClick={this.toggleMenu}>Your Settings</Link></div>
						<div className="link-container"><FontAwesomeIcon icon={faPlus}/><a className="fifth" onClick={this.addAccount}>Add Account</a></div>
					</div>
				</div>*/}
			</nav>
		);
	}
}

export default Navbar;
