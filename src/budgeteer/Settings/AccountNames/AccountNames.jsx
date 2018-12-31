/*eslint no-undefined: 0*/
import React, { Component } from "react";
import axios from 'axios';

import './accountNames.scss';

class AccountNames extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accounts: [],
			mapOfAccountNamesToDisplayNames: new Map()
		}

		this.handleChange = this.handleChange.bind(this);
		this.getDisplayName = this.getDisplayName.bind(this);
		this.jsonToMap = this.jsonToMap.bind(this);
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
			console.log("Error: ");
			console.log(err);
		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			accounts: props.accounts
		}
	}

	getAccountIDFromAccountName(accountName) {
		for (const account of this.props.accounts) {
			if (account.name === accountName) return account.account_id;
		}
	}

	getDisplayName(account_id) {
		return this.state.mapOfAccountNamesToDisplayNames.get(account_id) || "";
	}

	handleClick(e) {
		const map = this.state.mapOfAccountNamesToDisplayNames !== undefined ? this.state.mapOfAccountNamesToDisplayNames : new Map();
		const vals = document.querySelectorAll(".account-names--input");

		vals.forEach(val => {
			const displayName = val.value || val.placeholder;

			// Skip the entry if there is no value
			if (displayName === "" || displayName === null || displayName === undefined) return;

			const accountName = val.parentNode.querySelector(".account-names--name").innerText;
			const accountID = this.getAccountIDFromAccountName(accountName);
			map.set(accountID, displayName);
		});

		axios.post('/user-info/display-names', {
			data: {
				map: JSON.stringify(map)
			}
		});
	}

	handleChange(e, id) {
		this.setState({
			[id]: e.target.value
		});
	}

	render() {
		return (
			<div className="accounts">
				<h1>Account Display Names</h1>
				{this.state.accounts.map((acct, index) =>
					<div className="account-names" key={index}>
						<h3 className="account-names--name">{acct.name}</h3>
						<h3 className="account-names--display">Display Name: </h3>
						<input className="account-names--input" id={index} placeholder={this.getDisplayName(acct.account_id)} onChange={(e) => this.handleChange(e, acct.account_id)} type='text'/>
					</div>
				)}
				<button onClick={(e) => this.handleClick(e)} className="account-names--submit">Update</button>
			</div>
		)
	}
}

export default AccountNames;
