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

	componentDidMount() {
		window.addEventListener("scroll", (e) => {
			const num = document.documentElement.scrollTop + document.body.scrollTop;
			const denom = (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
			const percent = num / denom;

			if (percent > .0075) {
				this.showMoreItems();
			}
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			transactionsToDisplay: nextProps.transactions.slice(0, 10),
			num: 10
		});
	}

	showMoreItems() {
		if (this.state.num + 10 > this.props.transactions.length) {
			// if there are fewer than 10 transactions left --> Don't want to go over limit
			this.setState({
				transactionsToDisplay: this.props.transactions,
				num: this.props.transactions.length
			})

			// If all transactions are shown, remove the button
			// TODO: find a react way to do this (I think using refs)
			//document.querySelector("#showMore").remove();
		} else {
			// if there are more than 10 transactions left --> Don't worry about going over
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
				<div className='transaction-container--item'>
					{this.state.transactionsToDisplay.map( (t, index) => <Transaction key={index} transaction={t} /> )}
				</div>
			</div>
			);
	}
}

export default TransactionContainer;
