import React, { Component } from "react";
import Transaction from "./Transaction/Transaction.jsx";

import { numberWithCommas } from '../../helpers';

import "./transactionContainer.scss";

class TransactionContainer extends Component {
	constructor(props) {
		super(props)

		// let initialNum = this.props.transactions.length < 10 ? this.props.transactions.length : 10
		let transactions = this.props.transactions.slice(-10).reverse();

		this.state = {
			num: 10,
			transactionsToDisplay: transactions
		};

		this.showMoreItems = this.showMoreItems.bind(this);
	}

	componentDidMount() {
		window.addEventListener("scroll", () => {
			if (this.state.transactionsToDisplay.length !== this.props.transactions.length) {
				const num = document.documentElement.scrollTop + document.body.scrollTop;
				const denom = (document.documentElement.scrollHeight - document.documentElement.clientHeight)
				const percent = num / denom * 100;

				if (percent > .75 ) {
					this.showMoreItems();
				}
			}
		});
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", () => {});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			transactionsToDisplay: nextProps.transactions.slice(-10).reverse(),
			num: 10
		});
	}

	showMoreItems() {
		if (this.state.num + 20 > this.props.transactions.length) {
			// if there are fewer than n transactions left --> Don't want to go over limit
			this.setState({
				transactionsToDisplay: this.props.transactions.reverse(),
				num: this.props.transactions.length
			});
		} else {
			// if there are n or more transactions left
			let relevent = this.props.transactions.slice(-(this.state.num + 20)).reverse();

			this.setState({
				transactionsToDisplay: relevent,
				num: this.state.num + 20
			});
		}
	}

	render() {
		const amtColor = this.props.categoryTotal * -1 > 0 ? 'green' : 'red';
		const transactionInfo = this.props.categoryType ? <h2 className="transaction--totals">{this.props.categoryType}: <span className={amtColor}>${numberWithCommas(this.props.categoryTotal * -1)}</span></h2> : '';

		return (
			<section className="transaction-container">
				<h1>Past Transactions</h1>
				{transactionInfo}
				<div className="transactions">
					{this.state.transactionsToDisplay.map( (t, index) => <Transaction key={index} accounts={this.props.accounts} transaction={t} /> )}
				</div>
			</section>
		);
	}
}

export default TransactionContainer;
