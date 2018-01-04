import React, { Component } from 'react';
import TransactionContainer from './TransactionContainer.jsx';
import '../scss/accountsContainer.scss'

class AccountsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// this state variable is used to keep track of transactions the
			// user wants to see
			categoryTransactions: [],
			// Stores how the user is currently sorting their transactions
			categoryType: '',
			categoryTotal: 0
		};

		this.getAccountTransactions = this.getAccountTransactions.bind(this);
		this.getCategoryTransactions = this.getCategoryTransactions.bind(this);
	}

	getAccountTransactions(account_id) {
		let allTransactions = this.props.transactions;

		let releventTransactions = [];
		let type;
		let total = 0;

		if (account_id === 'none') {
			releventTransactions = [];
			type = '';
		} else if (account_id === "all") {
			releventTransactions = allTransactions;
			type = 'All Categories';
		} else {
			allTransactions.map( (transaction) => {
				if (transaction.account_id === account_id) {
					releventTransactions.push(transaction);
				}
			});
		}

		releventTransactions.forEach((transaction) => {
			total += transaction.amount;
		});
		total = (Math.round(total * 100) / 100).toFixed(2);

		// Update the state with the relevent transactions and how the user is sorting them
		this.props.accounts.forEach(account => {
			if (account.account_id === account_id) {
				type = account.name;
				return;
			}
		});

		this.setState({
			categoryTransactions: releventTransactions,
			categoryType: type,
			categoryTotal: total
		});

	}

	getCategoryTransactions(categoryString) {
		let releventTransactions = [];

		// Other displays transactions with a category of null
		if (categoryString === 'Other') {
			this.props.transactions.forEach(t => {
				if (t.category === null || t.category[0] === 'Bank Fees' || t.category[0] === 'Cash Advance' || t.category[0] === 'Interest' || t.category[0] === 'Payment' || t.category[0] === 'Tax' || t.category[0] === 'Transfer') {
					releventTransactions.push(t);
				}
			});
		} else {
			this.props.transactions.forEach(t => {
				if (t.category !== null && t.category[0] === categoryString) {
					releventTransactions.push(t);
				}
			});
		}

		// Get the total spent for the current Category
		let total = 0;
		releventTransactions.forEach((transaction) => {
			total += transaction.amount;
		});
		total = (Math.round(total * 100) / 100).toFixed(2);

		// Update the state with the relevent transactions and how the user is sorting them
		this.setState({
			categoryTransactions: releventTransactions,
			categoryType: categoryString,
			categoryTotal: total
		});
	}

	render() {

		return (
			<div className='accounts'>

				<h3 className='accounts--sort-options' >Sort by Account Type</h3>
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

				<h3 className='accounts--sort-options'>Sort by Categories</h3>
				<div className='accounts--btns'>
					<button onClick={() => { this.getCategoryTransactions('Food and Drink') }}>Food and Drink</button>
					<button onClick={() => { this.getCategoryTransactions('Travel') }}>Travel</button>
					<button onClick={() => { this.getCategoryTransactions('Shops') }}>Shops</button>
					<button onClick={() => { this.getCategoryTransactions('Recreation') }}>Recreation</button>
					<button onClick={() => { this.getCategoryTransactions('Service') }}>Service</button>
					<button onClick={() => { this.getCategoryTransactions('Community') }}>Community</button>
					<button onClick={() => { this.getCategoryTransactions('Healthcare') }}>Healthcare</button>
					<button onClick={() => { this.getCategoryTransactions('Other') }}>Other</button>
				</div>

				<h2 className='accounts--totals'>Total spent on {this.state.categoryType}</h2>
				<h2 className='accounts--totals'>{this.state.categoryTotal}</h2>

				<TransactionContainer transactions={this.state.categoryTransactions} />

			</div>
			);
	}

}

export default AccountsContainer;
