import axios from 'axios';
import React, { Component } from "react";
import helpers from '../helpers';

import Budget from "../Statistics/BudgetChart/BudgetChart.jsx";
import TransactionContainer from '../AccountsContainer/TransactionContainer/TransactionContainer.jsx';

import './home.scss';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			total: window.sessionStorage.getItem("total") || "..."
		};
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if (props.transactions && props.accounts) {
	// 		return {
	// 			recentTransactions: "props.transactions.slice(0,5)",
	// 			accounts: props.accounts
	// 		}
	// 	}
	// 	return;
	// }


	async componentDidMount() {

		let data = await axios({
				method: "POST",
				url: '/plaid-api/balance'
			});
		data = data.data;
		data = helpers.numberWithCommas(helpers.formatAmount(data.networth));

		this.setState({
			total: data
		});

		window.sessionStorage.setItem("total", data);
	}

	render() {

		let text;

		if (this.props.loading) {
			text = <div className="home--loading"><h1>Loading...</h1><img src='./loading-gifs/loading-one.gif' alt='loading' /></div>
		} else {
			text = "";
		}

		return (
			<div className="home">
				{text}

				<h1>Your Snapshot</h1>
				{/*
				<div className="home--details">
					<h2 className="home--details--acct-balance">Networth: ${this.state.total}</h2>
					<h2 className="home--details--savings-ratio">Amount Saved this Month / Monthly Income</h2>
				</div>
				*/}
				{/*Amt saved this month is monthly budget - total spent this month*/}
				{/*Monthly income is defined for the statistics page --> This should be stored in the DB and on the session */}

				<div className="home--monthly-budget">
					<h2>Monthly Budget</h2>
					<Budget displayInput={false} transactions={this.props.transactions} />
				</div>

				<div className='home--transactions'>
					<h2>Recent Transactions</h2>
					<TransactionContainer transactions={this.props.transactions.slice(-3)} accounts={this.props.accounts} />
				</div>

			</div>
		);
	}
}

export default Home;
