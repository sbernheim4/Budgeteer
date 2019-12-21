/*eslint no-undefined: 0*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { toTitleCase } from './../../helpers';
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
		this.jsonToMap = this.jsonToMap.bind(this);
		this.displayMessage = this.displayMessage.bind(this);
	}

	mapToJson(map) {
		return JSON.stringify([...map]);
	}

	jsonToMap(jsonStr) {
		return new Map(JSON.parse(jsonStr));
	}

	async componentDidMount() {
		try {
			let names = await axios.get('/user-info/display-names');
			names = names.data;

			const map = this.jsonToMap(names);
			this.setState({
				mapOfAccountNamesToDisplayNames: map
			});
		} catch (err) {
			this.setState({
				mapOfAccountNamesToDisplayNames: new Map()
			});
		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			accounts: props.accounts
		};
	}

	getAccountIDFromAccountName(accountName) {
		for (const account of this.props.accounts) {
			if (account.name === accountName) {
				return account.account_id;
			}
		}
	}

	getDisplayName(account_id) {

        const accountName = this.state.mapOfAccountNamesToDisplayNames.get(account_id) || '';

        return toTitleCase(accountName);

	}

	saveUpdateDisplayNames() {

		const displayNameElements = document.querySelectorAll('.account-names--input');
		const map = this.state.mapOfAccountNamesToDisplayNames !== undefined ?
				this.state.mapOfAccountNamesToDisplayNames :
				new Map();

		displayNameElements.forEach((element) => {

			const displayName = element.value || element.placeholder;

			// Skip the entry if there is no value
			if (displayName === '' || displayName === null || displayName === undefined) return;

			const accountName = element.parentNode.querySelector('.account-names--name').innerText;
			const accountID = this.getAccountIDFromAccountName(accountName);

			map.set(accountID, displayName);

		});

		axios.post('/user-info/display-names', {
			data: {
				map: JSON.stringify([...map])
			}
		});

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
	return {
		accounts: state.app.accounts || []
	};
};

const mapDispatchToProps = () => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountNames);
