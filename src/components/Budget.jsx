import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

import helpers from "./helpers.js";

import differenceInDays from "date-fns/difference_in_days";
import isSameMonth from "date-fns/is_same_month";
import isSameYear from "date-fns/is_same_year";

import "../scss/budget.scss";

class Budget extends Component {
	constructor(props){
		super(props);

		this.state = {
			monthlyBudget: "",
			spentThisMonth: 0,

			data: {
				labels: [
					"Spent",
					"Remaining"
				],
				datasets: [{
					data: [0, 1],
					backgroundColor: [
						"rgb(212,99,99)",
						"rgb(77, 153, 114)"
					],
					hoverBackgroundColor: [
						"#D46363",
						"#007255"
					]
				}]
			}
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const totalSpent = this.getTotalSpent(); // Get total spent this month
		const monthlyBudgetFromSessionStorage = localStorage.getItem("monthlyBudget"); // Get monthly budget from session storage


		// Calculate remaining amount left to spend
		let remaining = (monthlyBudgetFromSessionStorage - totalSpent).toFixed(2);
		if (remaining <= 0) {
			remaining = 0;
		}


		// Update chart
		if (monthlyBudgetFromSessionStorage !== null) {
			const chartData = {
				labels: [
					"Spent",
					"Remaining"
				],
				datasets: [{
					data: [totalSpent, remaining],
					backgroundColor: [
						"rgb(212,99,99)",
						"rgb(77, 153, 114)"
					],
					hoverBackgroundColor: [
						"#D46363",
						"#007255"
					]
				}]
			}

			// Update state data
			this.setState({
				data: chartData,
				monthlyBudget: monthlyBudgetFromSessionStorage
			});
		}
	}

	getTotalSpent() {
		let total = 0;

		let today = new Date();

		// Sum up the prices of each transaction
		this.props.transactions.forEach(t => {
			let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			if (isSameMonth(transactionDate, today) && isSameYear(transactionDate, today)) {
				total += t.amount;
			}
		})

		// Round total to two decimal places and ensure trailing 0s appear
		total = helpers.formatAmount(total);
		this.setState({ spentThisMonth: total });
		return total;
	}

	handleChange(event) {
		// Update the state variable
		this.setState({ monthlyBudget: event.target.value.trim() });

		// Save data to the current local store
		localStorage.setItem("monthlyBudget", event.target.value.trim());

		// Update the percentage calculator
		const spent = this.state.spentThisMonth;
		let remaining = (event.target.value - this.state.spentThisMonth).toFixed(2);
		if (remaining <= 0) {
			remaining = 0;
		}

		// Update the chart
		const data = {
			labels: [
				"Spent",
				"Remaining"
			],
			datasets: [{
				data: [spent, remaining],
				backgroundColor: [
					"rgb(212, 99, 99)",
					"rgb(77, 153, 114)"
				],
				hoverBackgroundColor: [
					"rgb(201, 59, 59)",
					"rgb(60, 119, 89)"
				]
			}]
		};
		this.setState({data: data})
	}

	render() {
		let spent = helpers.numberWithCommas(this.state.spentThisMonth);

		let remaining = (this.state.monthlyBudget - this.state.spentThisMonth).toFixed(2);
		remaining = helpers.numberWithCommas(remaining);

		return (
			<div className="budget">

				<div className="budget--doughnut-chart">
					<Doughnut data={this.state.data} />
				</div>

				<form className="budget--form">
					<label>
						<span>Monthly Budget</span>
						<input placeholder="Enter your budget" type="number" name="budget" value={this.state.monthlyBudget} onChange={this.handleChange} />
					</label>
				</form>

				<div className="budget--totals">
					<h2>Spent: ${spent}</h2>
					<h2>Remaining: ${remaining}</h2>
				</div>

			</div>
		);
	}
}

export default Budget;
