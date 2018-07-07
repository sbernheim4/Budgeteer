import axios from 'axios';
import React, { Component } from "react";
import helpers from '../helpers';

import './home.scss';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			total: "..."
		};
	}

	async componentDidMount() {

		let data = await axios({
				method: "POST", 
				url: '/plaid-api/balance'
			});
		data = data.data;

		this.setState({
			total: helpers.formatAmount(data.networth)
		});
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

				<section className="home--info">
					<h1>Welcome to Budgeteer</h1>

					<div className="home--info--details">
						<h2 className="home--info--details--acct-balance">Total account balance: ${this.state.total}</h2>
						<h2 className="home--info--details--savings-ratio">Amount Saved this Month / Monthly Income</h2> 
						{/* Amt saved this month is monthly budget - total spent this month*/}
						{/* Monthly income is defined for the statistics page --> This should be stored in the DB and on the session */}
					</div>

				</section>
			</div>
		);
	}
}

export default Home;
