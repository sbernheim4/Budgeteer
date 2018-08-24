import axios from 'axios';
import React, { Component } from "react";
import Budget from "../Statistics/BudgetChart/BudgetChart.jsx";
import TransactionContainer from '../AccountsContainer/TransactionContainer/TransactionContainer.jsx';
import { formatAmount, numberWithCommas } from '../helpers';
import './home.scss';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			total: window.sessionStorage.getItem("total") || "...",
			transactions: []
		};
	}

	static getDerivedStateFromProps(props, state) {
		const sortedTransactions = props.transactions.sort((a, b) => {
			let dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateTwo - dateOne;
		});

		return {
			transactions: sortedTransactions.slice(0, 3)
		}
	}

	async componentDidMount() {
		let data = await axios({
			method: "POST",
			url: '/plaid-api/balance'
		});

		data = data.data;
		if (data.Error) {
			let keyAndEnv = await axios.get('/plaid-api/key-and-env');

			const plaid = Plaid.create({
				apiVersion: 'v2',
				clientName: 'Update Account',
				env: keyAndEnv.data.env,
				product: ['transactions'],
				key: keyAndEnv.data.publicKey,
				token: data.publicToken,
				onSuccess: function (public_token) {
					console.log("Update of Account successful");
				}
			});

			plaid.open();
		}

		data = numberWithCommas(formatAmount(data.networth));

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
					<TransactionContainer transactions={this.state.transactions} accounts={this.props.accounts} />
				</div>

			</div>
		);
	}
}

export default Home;
