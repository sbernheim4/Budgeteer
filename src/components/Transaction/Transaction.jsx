import React, { Component } from 'react';

import '../../scss/transaction.scss';

class Transaction extends Component {
	constructor(props) {
		super(props)
		this.state = {};
	}
	render() {
		return (
			<div className='transaction'>
				<h4>{JSON.parse(JSON.stringify(this.props.transaction.name))}</h4>
				<p>Amount: {JSON.stringify(this.props.transaction.amount)}</p>
				<p>Date: {JSON.stringify(this.props.transaction.date)}</p>
			</div>
		);
	}
}


export default Transaction;
