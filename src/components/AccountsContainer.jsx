import React, { Component } from 'react';
import TransactionContainer from './TransactionContainer.jsx';
import '../scss/accountsContainer.scss'

class AccountsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// this state variable is used to keep track of transactions the
			// user wants to see
			transactions: []
		};

		this.getAccountTransactions = this.getAccountTransactions.bind(this);
		this.getCategoryTransactions = this.getCategoryTransactions.bind(this);
	}

	getAccountTransactions(account_id) {
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

			// Set the state of transactions to only those transactions with
			// the same account id as what the user selected
			this.setState({transactions: releventTransactions});
		}
	}

	getCategoryTransactions(categoryString) {
		let releventTransactions = [];

		if (categoryString === 'Other') {
			this.props.transactions.forEach(t => {
				if (t.category === null) {
					releventTransactions.push(t);
				}
			});
		} else {
			this.props.transactions.forEach(t => {
				if (t.category !== null && t.category.includes(categoryString)) {
					releventTransactions.push(t);
				}
			});
		}

		this.setState({ transactions: releventTransactions })
	}

	render() {
		return (
			<div className='accounts'>

				<h3>Sort by Account Type</h3>
				<div className='accounts--btns'>
					{/* Show All Transactions */}
					<button onClick={() => { this.getAccountTransactions("all")}}>All Transactions</button>
					
					{/* Generate a button for each type of account connected */}
					{this.props.accounts.map( (a, index) => (
						<button key={index} onClick={() => { this.getAccountTransactions(a.account_id)}}>{a.name}</button>
					))}
					
					{/* Hide All Transactions */}
					<button onClick={() => { this.getAccountTransactions('none')}}>Hide Transactions</button>
				</div>

				<h3>Sort by Categories</h3>
				<div className='accounts--btns'>
					<button onClick={() => { this.getCategoryTransactions('Food and Drink') }}>Food and Drink</button>
					<button onClick={() => { this.getCategoryTransactions('Travel') }}>Travel</button>
					<button onClick={() => { this.getCategoryTransactions('Shops') }}>Shops</button>
					<button onClick={() => { this.getCategoryTransactions('Recreation') }}>Recreation</button>
					<button onClick={() => { this.getCategoryTransactions('Service') }}>Service</button>
					<button onClick={() => { this.getCategoryTransactions('Community') }}>Community</button>
					<button onClick={() => { this.getCategoryTransactions('Healthcare') }}>Healthcare</button>
					<button onClick={() => { this.getCategoryTransactions('Other') }}>Other</button>

					{/* TODO: These categories should be in a do more section */}
					{/* <button className='home--category-btns' onClick={() => { this.getCategory('Bank Fees') }}>Bank Fees</button>
					<button onClick={() => { this.getCategoryTransactions('Cash Advance') }}>Cash Advance</button>
					<button onClick={() => { this.getCategoryTransactions('Interest') }}>Interest</button>
					<button onClick={() => { this.getCategoryTransactions('Payment') }}>Payment</button>
					<button onClick={() => { this.getCategoryTransactions('Tax') }}>Tax</button>
					<button onClick={() => { this.getCategoryTransactions('Transfer') }}>Transfer</button> */}
				</div>

				<TransactionContainer transactions={this.state.transactions} />

			</div>
			);
	}

}

export default AccountsContainer;
