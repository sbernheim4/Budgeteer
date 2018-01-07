import React, { Component } from "react";
import Transaction from "./Transaction.jsx"

import "../scss/transactionContainer.scss"

class TransactionContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {};
	}

	render() {
		return (
			<div className="transaction-container">
				{this.props.transactions.map( (t, index) => (
					<Transaction key={index} transaction={t} />
				))}
			</div>
		);
	}
}

export default TransactionContainer;
