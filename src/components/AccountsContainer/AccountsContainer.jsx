import React, { Component } from 'react';
import TransactionContainer from '../TransactionContainer/TransactionContainer.jsx';
import '../../scss/accountsContainer.scss'

class AccountsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			transactions: []
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(account_id) {
		let allTransactions = this.props.transactions;

		if (account_id === "all") {
			this.setState({transactions: allTransactions});
		} else {

			let releventTransactions = [];
			
			allTransactions.map( (transaction) => {
				if (transaction.account_id === account_id) {
					releventTransactions.push(transaction);
				}
			});

			this.setState({transactions: releventTransactions});
		}
	}

	render() {
		return (
			<div className='accounts'>
				<div className='accounts--btns'>
					<button onClick={() => {this.handleClick("all")}}>View All Transactions</button>
					{this.props.accounts.map( (a, index) => (
						<button onClick={() => {this.handleClick(a.account_id)}}>{a.name}</button>
					))}
				</div>

				<TransactionContainer transactions={this.state.transactions} />

			</div>
			);
	}

}

export default AccountsContainer;
