import React from 'react';
import { connect } from 'react-redux';

import BudgetChart from './../Statistics/BudgetChart/BudgetChart.jsx';
import TransactionContainer from '../AccountsContainer/TransactionContainer/TransactionContainer.jsx';

import { convertTransactionDate } from '../helpers.js';

import './home.scss';

function Home(props) {

	if (props.loading) {

		return <div className='home--loading'>
			<h1>Loading...</h1>
			<img src='/loading-gifs/loading-one.gif' alt='loading' />
		</div>

	} else {

		return <div className='home'>

			<h1>Your Snapshot</h1>

			<div className='home--snapshot'>
				<div className='home--snapshot--monthly-budget'>
					<BudgetChart displayInput={false} />
				</div>

				<div className='home--snapshot--transactions'>
					<h2>Recent Transactions</h2>
					<TransactionContainer transactions={props.recentTransactions} accounts={props.accounts} />
				</div>
			</div>
		</div>

	}

}

const mapStateToProps = (state) => {

	const recentTransactions =
		state.app.transactions
		.sort((a, b) => {
			const dateA = convertTransactionDate(a.date);
			const dateB = convertTransactionDate(b.date);
			return dateB - dateA;
		}).slice(0, 3);

	return {
		recentTransactions,
		accounts: state.app.accounts || []
	};

};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
