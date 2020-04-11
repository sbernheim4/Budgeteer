/*eslint no-undefined: 0*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDisplayNames, setDisplayNames } from './../../redux/actions/app';
import BannerMessage from '../../BannerMessage/BannerMessage.jsx';

import './accountNames.scss';

class AccountNames extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mapOfAccountNamesToDisplayNames: new Map()
		};

		this.handleChange = this.updateAccountDisplayName.bind(this);
		this.getDisplayName = this.getDisplayName.bind(this);
		this.displayMessage = this.displayMessage.bind(this);
	}

	async componentDidMount() {

		this.props.getDisplayNames();
	}

	getAccountIdFromAccountName(accountName) {
		for (const account of this.props.accounts) {
			if (account.name === accountName) {
				return account.account_id;
			}
		}
	}

	getDisplayName(account_id) {

		const accountName = this.props.displayNames.get(account_id) || '';

		return accountName;

	}

	saveUpdateDisplayNames() {

		const displayNameElements = document.querySelectorAll('.account-names--input');
		const map = this.props.displayNames;

		displayNameElements.forEach((element) => {

			const displayName = element.value || element.placeholder;

			// Skip the entry if there is no value
			if (displayName === '' || displayName === null || displayName === undefined) return;

			const accountName = element.parentNode.querySelector('.account-names--name').innerText;
			const accountID = this.getAccountIdFromAccountName(accountName);

			map.set(accountID, displayName);

		});

		this.props.setDisplayNames(map);
		this.displayMessage();

	}

	displayMessage() {

		this.setState({
			displayBannerMessage: true
		});

		setTimeout(() => {
			this.setState({
				displayBannerMessage: false
			});
		}, 5500);

	}

	updateAccountDisplayName(e, id) {

		this.setState({
			[id]: e.target.value
		});

	}

	render() {
		return (
			<div className='account-names-container'>

				<BannerMessage
					text={'Your account names have been updated'}
					display={this.state.displayBannerMessage}
					color={'green'}
				/>

				<h1>Account Nicknames</h1>

				{this.props.accounts.map((acct, index) => (
					<div className='account-names' key={index}>
						<h3 className='account-names--name'>{acct.name}</h3>
						<input
							className='account-names--input'
							id={index}
							placeholder={this.getDisplayName(acct.account_id)}
							onChange={(e) => this.updateAccountDisplayName(e, acct.account_id)}
							type='text'
						/>
					</div>
				))}

				<button onClick={(e) => this.saveUpdateDisplayNames(e)} className='account-names--submit'>
					Update
				</button>

			</div>
		);
	}
}

const mapStateToProps = (state) => {

	const displayNames = new Map(state.app.displayNames);

	return {
		accounts: state.app.accounts || [],
		displayNames
	};

};

const mapDispatchToProps = (dispatch) => {

	return {
		getDisplayNames: () => dispatch(getDisplayNames()),
		setDisplayNames: (newDisplayNames) => dispatch(setDisplayNames(newDisplayNames))
	};

};

export default connect(mapStateToProps, mapDispatchToProps)(AccountNames);
