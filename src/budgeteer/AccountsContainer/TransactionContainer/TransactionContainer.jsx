import React, { Component } from 'react';
import Transaction from './Transaction/Transaction.jsx';

import { dollarify } from '../../helpers';

import './transactionContainer.scss';

const loadTransactionsOnScroll = (state, props) => () => {

	if (state.transactionsToDisplay.length !== props.transactions.length) {

		const numerator = document.documentElement.scrollTop + document.body.scrollTop;
		const denominator = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const percent = (numerator / denominator) * 100;

		if (percent > 0.75) {
			this.displayMoreTransactions();
		}

	}

};

class TransactionContainer extends Component {
	constructor(props) {
		super(props);

		// let initialNum = this.props.transactions.length < 10 ? this.props.transactions.length : 10
		const transactions = this.props.transactions.slice(-10).reverse();

		this.state = {
			num: 25,
			transactionsToDisplay: transactions
		};

		this.displayMoreTransactions = this.displayMoreTransactions.bind(this);
		this.amount = dollarify(this.props.categoryTotal * -1);
		this.amtColor = this.props.categoryTotal * -1 > 0 ? 'green' : 'red';

	}

	componentDidMount() {

		window.addEventListener('scroll', loadTransactionsOnScroll(this.state, this.props));

	}

	componentWillUnmount() {
		window.removeEventListener('scroll', loadTransactionsOnScroll);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			transactionsToDisplay: nextProps.transactions.slice(-25).reverse(),
			num: 25
		});
	}

	displayMoreTransactions() {

		let transactionsToDisplay;
		let num;

		if (this.state.num + 20 > this.props.transactions.length) {

			transactionsToDisplay = this.props.transactions.reverse();
			num = this.props.transactions.length;

		} else {

			// if there are n or more transactions left
			transactionsToDisplay = this.props.transactions.slice(-(this.state.num + 20)).reverse();
			num = this.state.num + 20;

		}

		this.setState({
			transactionsToDisplay,
			num
		});

	}

	render() {

		return (
			<section className='transaction-container'>
				<h1>{this.props.title || ''}</h1>

				{ this.props.categoryType &&
					<h2 className='transaction--totals'>
						{this.props.categoryType}:{' '}<span className={this.amtColor}>${this.amount}</span>
					</h2>
				}

				<div className='transactions'>
					{this.state.transactionsToDisplay.map((t, index) => (
						<Transaction
							key={index}
							transaction={t}
						/>
					))}
				</div>
			</section>
		);
	}
}

export default TransactionContainer;
