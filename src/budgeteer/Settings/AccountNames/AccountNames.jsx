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
		this.getValue = this.getValue.bind(this);
	}

	async componentDidMount() {
		let names = await axios.get('/user-info/display-names');
		names = names.data;
	}

	static getDerivedStateFromProps(props, state) {
		return {
			accounts: props.accounts
		}
	}

	getValue(account_id) {
		return this.state.account_id;

	}

	handleClick(e, accountID) {
		const inputVal = e.target.parentNode.querySelector("input");
		const displayName = inputVal.value;

		axios.post('/user-info/display-names', {
			data: {
				[accountID]: displayName
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
						<input className="account-names--input" id={index} value={this.getValue(acct.account_id)} onChange={(e) => this.handleChange(e, acct.account_id)} type='text'/>
						<button onClick={(e) => this.handleClick(e, acct.account_id)} className="account-names--submit">Update</button>
					</div>
				)}
			</div>
		)
	}
}

export default AccountNames;
