import React, { Component } from "react";
import { Link } from 'react-router-dom';

/* Font Awesome */
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/fontawesome-free-solid';

import "../scss/navbar.scss";

class Navbar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			handler: {}
		}

		this.addAccount = this.addAccount.bind(this);
	}

	async componentDidMount() {

		let keyAndEnv = await fetch('plaid-api/key-and-env');
		keyAndEnv = await keyAndEnv.json();

		const plaid = Plaid.create({
			apiVersion: 'v2',
			clientName: 'Plaid Walkthrough Demo',
			env: keyAndEnv.env,
			product: ['transactions'],
			key: keyAndEnv.publicKey,
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

		this.setState({ handler: plaid });
	}

	addAccount() {
		this.state.handler.open();
	}

	toggleMenu() {
		document.querySelector(".navbar--mobile--links").classList.toggle("navbar--mobile--links__active");
	}

	render() {
		return (
			<nav className='navbar'>
				<div className='navbar--desktop'>
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/accounts'>Transactions</Link></li>
						<li><Link to='/statistics'>Statistics</Link></li>
						<li><Link to='/networth'>Networth</Link></li>
					</ul>

					<div>
						<button onClick={this.addAccount}>Add Accounts</button>
					</div>
				</div>

				<div className="navbar--mobile">
					<FontAwesomeIcon className="icon" icon={faBars} onClick={this.toggleMenu}/>

					<div className='navbar--mobile--links'>
						<p className="first" onClick={this.toggleMenu} ><Link to='/'>Home</Link></p>
						<p className="second" onClick={this.toggleMenu} ><Link to='/accounts'>Transactions</Link></p>
						<p className="third" onClick={this.toggleMenu} ><Link to='/statistics'>Statistics</Link></p>
						<p className="fourth" onClick={this.toggleMenu} ><Link to='/networth'>Networth</Link></p>
						<p className="fifth" onClick={this.addAccount}>Add Account</p>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
