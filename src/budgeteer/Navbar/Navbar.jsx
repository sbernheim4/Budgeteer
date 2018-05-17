import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

/* Font Awesome */
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/fontawesome-free-solid';

import "./navbar.scss";

class Navbar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			handler: {}
		}

		this.addAccount = this.addAccount.bind(this);
	}

	async componentDidMount() {

		let keyAndEnv = await axios.get('/plaid-api/key-and-env');

		const plaid = Plaid.create({
			apiVersion: 'v2',
			clientName: 'Plaid Walkthrough Demo',
			env: keyAndEnv.data.env,
			product: ['transactions'],
			key: keyAndEnv.data.publicKey,
			onSuccess: function (public_token) {
				fetch('/plaid-api/get-access-token', {
					method: 'post',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						public_token: public_token,
						client_id: '5a24ca6a4e95b836d37e37fe',
						secret: 'f07a761a591de3cbbc5ac3ba2f4301'
					})
				});
			}
		});

		this.setState({
			handler: plaid
		});
	}

	addAccount() {
		this.state.handler.open();
	}

	toggleMenu() {
		const navbarLinks = document.querySelector(".navbar--mobile--links");

		navbarLinks.classList.toggle("navbar--mobile--links__active");

		// Control the height of the body if the navbar is opened or closed
		if (navbarLinks.classList.contains("navbar--mobile--links__active")) {
			document.querySelector("body").style.maxHeight = "100vh";
			document.querySelector("body").style.overflowY = "hidden";

			document.querySelector(".navbar--mobile--header").style.filter = "brightness(.8)";
			document.querySelector(".main").style.filter = "brightness(.6)";
		} else {
			document.querySelector("body").style.maxHeight = null;
			document.querySelector("body").style.overflowY = null;

			document.querySelector(".navbar--mobile--header").style.filter = null
			document.querySelector(".main").style.filter = null;
		}
	}

	closeMenu() {
		const navbarMenu = document.querySelector(".navbar--mobile--links");
		if (navbarMenu.classList.contains("navbar--mobile--links__active")) {
			navbarMenu.classList.remove("navbar--mobile--links__active");
		}
	}

	render() {
		return (
			<nav className='navbar'>
				<div className='navbar--desktop'>
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/transactions'>Transactions</Link></li>
						<li><Link to='/statistics'>Statistics</Link></li>
						<li><Link to='/networth'>Networth</Link></li>
						<li><Link to='/settings'>Settings</Link></li>
					</ul>

					<div>
						<button onClick={this.addAccount}>Add Accounts</button>
					</div>
				</div>

				<div className="navbar--mobile">
					<div className="navbar--mobile--header">
						<Link to='/' onClick={this.closeMenu}> <FontAwesomeIcon className="icon" icon={faHome}/> </Link>
						<h2>Budgeteer</h2>
						<FontAwesomeIcon className="icon" icon={faBars} onClick={this.toggleMenu}/>
					</div>

					<div className='navbar--mobile--links'>

						<div className="navbar--mobile--links--profile">
							<h3>Samuel Bernheim</h3>
						</div>

						<Link to='/transactions' className="first" onClick={this.toggleMenu}>Your Transactions</Link>
						<Link to='/statistics' className="second" onClick={this.toggleMenu}>Your Statistics</Link>
						<Link to='/networth' className="third" onClick={this.toggleMenu}>Your Networth</Link>
						<Link to='/settings' className="fourth" onClick={this.toggleMenu}>Your Settings</Link>
						<a className="fifth" onClick={this.addAccount}>Add Account</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
