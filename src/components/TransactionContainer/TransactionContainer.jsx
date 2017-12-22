import React, { Component } from 'react';
import Transaction from '../Transaction/Transaction.jsx'


class TransactionContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {};
	}

	render() {
		return (
			<div className='transactions'>
				{this.props.transactions.map( (t, index) => (
					<Transaction transaction={t} />
				))}
			</div>
		);
	}
}

export default TransactionContainer;
