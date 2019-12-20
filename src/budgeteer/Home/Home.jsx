import React, { Component } from 'react';
import { connect } from 'react-redux';

import Budget from './BudgetChart/BudgetChart.jsx';
import TransactionContainer from '../AccountsContainer/TransactionContainer/TransactionContainer.jsx';

import './home.scss';

function Home(props) {
	let text;

	if (props.loading) {

		text = (
			<div className='home--loading'>
				<h1>Loading...</h1>
				<img src='./loading-gifs/loading-one.gif' alt='loading' />
			</div>
		);

	} else {

		text = '';

	}

	return (

		<div className='home'>
			{text}

			<h1>Your Snapshot</h1>

			<div className='home--snapshot'>
				<div className='home--snapshot--monthly-budget'>
					<h2>Monthly Budget</h2>
					<Budget displayInput={false} transactions={props.transactions} />
				</div>

				<div className='home--snapshot--transactions'>
					<h2>Recent Transactions</h2>
					<TransactionContainer transactions={props.recentTransactions} accounts={props.accounts} />
				</div>
			</div>
		</div>

	);
}

const mapStateToProps = (state) => {

	const recentTransactions = state.app.transactions.length > 0 ? state.app.transactions.slice(0, 3) : [];

	return {
		recentTransactions: recentTransactions,
		accounts: state.app.accounts || []
	};

};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
