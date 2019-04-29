import React, { Component } from "react";
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"

import { formatAmount, numberWithCommas } from "../../helpers.js";

import "./budgetChart.scss";

const COLORS = [
	"#D46363",
	"#007255",
];

class CustomTooltip extends Component {

	render() {
		const { active } = this.props;

		if (active) {
			return (

				<div className="budget--tooltip">
					<p className="budget--tooltip--spent" >Spent: ${this.props.spent}</p>
					<p className="budget--tooltip--remaining">Remaining: ${this.props.remaining}</p>
				</div>
			);
		}

		return null;
	}
};

class BudgetChart extends Component {
	constructor(props){
		super(props);

		this.state = {
			monthlyBudget: 0,
			totalSpent: 0, // Total spent this month
			rechartsData: [
				{name: 'Spent', value: 0},
				{name: 'Remaining', value: 1}
			]
		};

		this.handleChange = this.handleChange.bind(this);
	}

	calculateTotalSpent(transactions) {
		const initialValue = 0;

		const rawTotalSpent = transactions.reduce(function (initialValue, transaction) {
			console.log(transaction.amount);
			return initialValue + transaction.amount;
		}, 0);

		const roundedTotalSpent = Number.parseFloat(rawTotalSpent.toFixed(2));

		const normalizedTotalSpent = Math.abs(roundedTotalSpent);

		return normalizedTotalSpent;
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		const transactions = nextProps.transactions;

		if (transactions.length <= 0) {
			return null;
		} else {
			const totalSpent = this.calculateTotalSpent(nextProps.transactions);
			const totalRemaining = monthlyBudget - totalSpent;
			const monthlyBudget = localStorage.getItem("monthlyBudget");

			// Create chart data set
			const chartData = [
				{ name: 'Spent', value: totalSpent },
				{ name: 'totalRemaining', value: totalRemaining },
			];

			// Set the state
			return {
				totalSpent: totalSpent,
				totalRemaining: totalRemaining,
				monthlyBudget: monthlyBudget,
				rechartsData: chartData,
			};
		}
	}

	handleChange(event) {
		const newMonthlyBudget = event.target.value.trim();

		// Save data to the current local store
		localStorage.setItem("monthlyBudget", newMonthlyBudget);

		const spent = this.state.totalSpent;
		const newRemaining = (newMonthlyBudget - this.state.totalSpent) <= 0 ? 0 : (newMonthlyBudget - this.state.totalSpent);

		// Update the chart
		let amts = [
			{name: 'Spent', value: spent},
			{name: 'Remaining', value: newRemaining},
		];

		this.setState({
			rechartsData: amts,
			monthlyBudget: newMonthlyBudget
		});

		axios({
			method: 'POST',
			url: '/user-info/monthly-budget',
			data: {
				monthlyBudget: newMonthlyBudget
			}
		});
	}

	render() {
		let spent = this.state.totalSpent;
		spent = formatAmount(spent);
		spent = numberWithCommas(spent);

		let remaining = this.state.totalSpent;
		remaining = formatAmount(remaining);
		remaining = numberWithCommas(remaining);

		const input = this.props.displayInput === false ? "" : (<form className="budget--form">
					<label>
						<input placeholder="Enter your budget" type="number" name="budget" value={this.state.monthlyBudget} onChange={this.handleChange} />
					</label>
				</form>);

		return (
			<div className="budget">

				{input}

				{/*<Doughnut className="budget--doughnut-chart" data={this.state.data} />*/}
				<ResponsiveContainer className="budget--doughnut-chart" width="100%" min-height={400} height={400} >
					<PieChart>
						<Pie
							dataKey="value"
							data={this.state.rechartsData}
							innerRadius="50%"
							outerRadius="90%"
							fill="#8884d8"
							paddingAngle={0}>

							{
								this.state.rechartsData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
							}
							{/*<Label className="center-label" fill={"white"} value={this.state.totalSpent} position="center" />*/}
						</Pie>
						<Tooltip content={<CustomTooltip remaining={remaining} spent={spent}/>}/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default BudgetChart;
