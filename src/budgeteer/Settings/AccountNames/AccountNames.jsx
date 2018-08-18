import React, { Component } from "react";

import './accountNames.scss';

class AccountNames extends Component {
	constructor(props) {
		super(props);

		this.state = {
			accounts: []
		}

		this.handleChange = this.handleChange.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		return {
			accounts: props.accounts
		}
	}

	getValue(account_id) {
		return this.state.account_id;
	}

	handleChange(e, id) {
		const newState = {
			[id]: e.target.value
		}

		this.setState(newState);
		console.log(newState);
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
						<input className="account-names--submit" type="submit" value="Update" />
					</div>
				)}
			</div>
		)
	}
}

export default AccountNames;
