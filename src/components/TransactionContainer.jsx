import React, { Component } from "react";
import Transaction from "./Transaction.jsx"

import "../scss/transactionContainer.scss"

class TransactionContainer extends Component {
	constructor(props) {
		super(props)

		let initialNum = this.props.transactions.length < 10 ? this.props.transactions.length : 10
		let transactions = this.props.transactions.slice(0, 10);

		this.state = {
			num: 10,
			transactionsToDisplay: transactions
		};

		this.showMoreItems = this.showMoreItems.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.transactionsToDisplay.length === 0) {
			this.setState({
				transactionsToDisplay: nextProps.transactions.slice(0, 10)
			});
		}
	}

	showMoreItems() {
		if (this.state.num + 10 > this.props.transactions.length) {
			this.setState({
				transactionsToDisplay: this.props.transactions,
				num: this.props.transactions.length
			})

			// If all transactions are shown, remove the button
			// TODO: find a react way to do this (I think using refs)
			document.querySelector("#showMore").remove();
		} else {
			let newTransactions = this.props.transactions.slice(this.state.num, this.state.num + 10);
			let relevent = this.state.transactionsToDisplay;
			relevent.push(...newTransactions);

			this.setState({
				transactionsToDisplay: relevent,
				num: this.state.num + 10
			});
		}
	}

	render() {
		return (
			<div className="transaction-container">
				{this.state.transactionsToDisplay.map( (t, index) => <Transaction key={index} transaction={t} /> )}
				<button id='showMore' onClick={this.showMoreItems}>Show More</button>
			</div>
		);
	}
}

export default TransactionContainer;
