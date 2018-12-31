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
		console.log("Making call to balance now: ")
		let data = await axios({
			method: "POST",
			url: '/plaid-api/balance'
		});

		data = data.data;

		if (data.Error) {
			let keyAndEnv = await axios.get('/plaid-api/key-and-env');
			keyAndEnv = keyAndEnv.data;
			console.log("keyAndEnv");
			console.log(keyAndEnv);

			// Open plaid in Link Mode
			const plaid = Plaid.create({
				key: keyAndEnv.publicKey,
				env: keyAndEnv.env,
				apiVersion: 'v2',
				clientName: 'Update Account',
				product: ['transactions'],
				token: data.publicToken,
				onSuccess: function (public_token, metadata) {
					console.log("Update of Account successful");
					console.log("public_token:", public_token)
					console.log("Metadata:", metadata);
				},
				onExit: function(err, metadata) {
					console.log("err:", err);
					console.log("metadata:", metadata);
				  }
			});

			plaid.open();
		} else {
			data = numberWithCommas(formatAmount(data.networth));
			this.setState({
				total: data
			});

			window.sessionStorage.setItem("total", data);
		}
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
				<div className="home--monthly-budget">
					<h2>Monthly Budget</h2>
					<Budget displayInput={false} transactions={this.props.transactions} />
				</div>

				<div className='home--transactions'>
					<TransactionContainer transactions={this.state.transactions} accounts={this.props.accounts} />
				</div>

			</div>
		);
	}
}

export default Home;
