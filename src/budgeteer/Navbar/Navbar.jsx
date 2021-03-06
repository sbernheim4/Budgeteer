import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Font Awesome base package
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Selective icons from Font Awesome
import {
	faBars,
	faHome,
	faExchangeAlt,
	// faChartPie,
	faMoneyBillAlt,
	faCogs,
	faPlus,
	faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import './navbar.scss';

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			handler: {
				user: '...'
			}
		};

		this.addAccount = this.addAccount.bind(this);
		this.logout = this.logout.bind(this);
	}

	async componentDidMount() {
		const keyAndEnv = await axios.get('/plaid-api/key-and-env');

		const plaid = Plaid.create({
			apiVersion: 'v2',
			clientName: 'Budgeteer',
			env: keyAndEnv.data.env,
			product: ['transactions'],
			key: keyAndEnv.data.publicKey,
			onSuccess: function(public_token) {
				axios({
					method: 'POST',
					url: '/plaid-api/get-access-token',
					data: {
						public_token: public_token,
						client_id: `${process.env.PLAID_CLIENT_ID}`,
						secret: `${process.env.PLAID_SECRET}`
					}
				});
			}
		});

		const name = await axios.get('/user-info/name');

		this.setState({
			handler: plaid,
			name: name
		});

	}

	addAccount() {
		this.state.handler.open();

		// Clear out local and session storage --> Storing networth info
		window.localStorage.clear();
		window.sessionStorage.clear();
		console.log('LOCAL AND SESSION STORAGE CLEARED');
	}

	async logout() {

		await axios.get('/login/logout');
		window.location.href = '/';

	}

	toggleMenu() {
		const navbarLinks = document.querySelector('.navbar--mobile--links');

		navbarLinks.classList.toggle('navbar--mobile--links__active');

		// Control the height of the body if the navbar is opened or closed
		if (navbarLinks.classList.contains('navbar--mobile--links__active')) {
			document.querySelector('body').style.maxHeight = '100vh';
			document.querySelector('body').style.overflowY = 'hidden';
		} else {
			document.querySelector('body').style.maxHeight = null;
			document.querySelector('body').style.overflowY = null;
		}
	}

	closeMenu() {
		const navbarMenu = document.querySelector('.navbar--mobile--links');
		if (navbarMenu.classList.contains('navbar--mobile--links__active')) {
			navbarMenu.classList.remove('navbar--mobile--links__active');
		}
	}

	render() {
		return (
			<nav className='navbar'>
				<div className='navbar--desktop'>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/transactions'>Transactions</Link>
						</li>

						{ /*
						<li>
							<Link to='/statistics'>Statistics</Link>
						</li>
						*/ }

						<li>
							<Link to='/networth'>Savings</Link>
						</li>
						<li>
							<Link to='/settings'>Settings</Link>
						</li>
					</ul>

					<div>
						<button onClick={this.addAccount}>Add Account</button>
						<button onClick={this.logout}>Logout</button>
					</div>
				</div>

				<div className='navbar--mobile'>
					<div className='navbar--mobile--header'>
						<Link to='/' onClick={this.closeMenu}>
							{' '}
							<FontAwesomeIcon className='icon' icon={faHome} />{' '}
						</Link>
						<h3>Budgeteer</h3>
						<FontAwesomeIcon className='icon' icon={faBars} onClick={this.toggleMenu} />
					</div>

					<div className='navbar--mobile--links'>
						<div className='navbar--mobile--links--profile'>
							<img src='https://via.placeholder.com/50x50' />
						</div>

						<Link to='/transactions' className='first' onClick={this.toggleMenu}>
							<div className='link-container'>
								<FontAwesomeIcon icon={faExchangeAlt} />
								Transactions
							</div>
						</Link>

						{ /*
						<Link to='/statistics' className='second' onClick={this.toggleMenu}>
							<div className='link-container'>
								<FontAwesomeIcon icon={faChartPie} />
								Statistics
							</div>
						</Link>
						*/ }

						<Link to='/networth' className='third' onClick={this.toggleMenu}>
							<div className='link-container'>
								<FontAwesomeIcon icon={faMoneyBillAlt} />
								Savings
							</div>
						</Link>

						<Link to='/settings' className='fourth' onClick={this.toggleMenu}>
							<div className='link-container'>
								<FontAwesomeIcon icon={faCogs} />
								Settings
							</div>
						</Link>

						<hr />

						<a className='fifth' onClick={this.addAccount}>
							<div className='link-container'>
								<FontAwesomeIcon icon={faPlus} />
								Link Bank Account
							</div>
						</a>
						<a className='sixth' onClick={this.logout}>
							<div className='link-container'>
								<FontAwesomeIcon icon={faSignOutAlt} />
								Logout
							</div>
						</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
