import React, { Component } from 'react';
import Transaction from './Transaction/Transaction.jsx';

import { numberWithCommas } from '../../helpers';

import './transactionContainer.scss';

class TransactionContainer extends Component {
	constructor(props) {
		super(props);

		// let initialNum = this.props.transactions.length < 10 ? this.props.transactions.length : 10
		let transactions = this.props.transactions.slice(-10).reverse();

		this.state = {
			num: 10,
			transactionsToDisplay: transactions
		};

		this.displayMoreTransactions = this.displayMoreTransactions.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', () => {
			if (this.state.transactionsToDisplay.length !== this.props.transactions.length) {
				const numerator = document.documentElement.scrollTop + document.body.scrollTop;
				const denominator = document.documentElement.scrollHeight - document.documentElement.clientHeight;
				const percent = (numerator / denominator) * 100;

				if (percent > 0.75) {
					this.displayMoreTransactions();
				}
			}
		});
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', () => {});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			transactionsToDisplay: nextProps.transactions.slice(-10).reverse(),
			num: 10
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

		const amtColor = this.props.categoryTotal * -1 > 0 ? 'green' : 'red';
		const amount = numberWithCommas(this.props.categoryTotal * -1);

		const transactionInfo = this.props.categoryType ? (
			<h2 className='transaction--totals'>
				{this.props.categoryType}:{' '}
				<span className={amtColor}>${amount}</span>
			</h2>
		) : (
			''
		);

		return (
			<section className='transaction-container'>
				<h1>{this.props.title || ''}</h1>

				{transactionInfo}

				<div className='transactions'>
					{this.state.transactionsToDisplay.map((t, index) => (
						<Transaction
							key={index}
							accounts={this.props.accounts}
							transaction={t}
							displayNames={this.props.displayNames}
						/>
					))}
				</div>
			</section>
		);
	}
}

export default TransactionContainer;
