import React, { Component } from 'react';

import '../../scss/transactions.scss';

class Transaction extends Component {
	constructor(props) {
		super(props)
		this.state = {};
	}
	render() {
		return (
			<div className='transactions--transaction'>
				<p>{JSON.stringify(this.props.transaction.name)}</p>
				<p>{JSON.stringify(this.props.transaction.amount)}</p>
				<p>{JSON.stringify(this.props.transaction.date)}</p>
			</div>
		);
	}
}


export default Transaction;
