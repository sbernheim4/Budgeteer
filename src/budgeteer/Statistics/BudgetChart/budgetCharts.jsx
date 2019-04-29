import React, { Component } from "react";
import axios from 'axios';
import Input from './Input/input.jsx';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"

import { formatAmount, numberWithCommas } from "../../helpers.js";

import "./budgetChart.scss";

const COLORS = [
	"#D46363",
	"#007255",
];

class CustomTooltip extends Component {

	render() {
		const { active, data } = this.props;

		if (active) {

			const spent = data[0].value;
			const remaining = data[1].value;

			return (
				<div className="budget--tooltip">
					<p className="budget--tooltip--spent" >Spent: ${spent}</p>
					<p className="budget--tooltip--remaining">Remaining: ${remaining}</p>
				</div>
			);
		} else {

			return null;

		}

	}
};

class BudgetChart extends Component {
	constructor(props){
		super(props);

		this.state = {
			monthlyBudget: 0,
			totalSpent: 0,
			totalRemaining: 0,
			rechartsData: [
				{name: 'Spent', value: 0},
				{name: 'Remaining', value: 1}
			]
		};

		this.updateMonthlyBudget = this.updateMonthlyBudget.bind(this);
	}

	static calculateTotalSpent(transactions) {
		let totalSpent = 0;

		transactions.forEach(transaction => {
			totalSpent += transaction.amount
		});

		const roundedTotalSpent = Number.parseFloat(totalSpent.toFixed(2));

		return roundedTotalSpent;
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		const transactions = nextProps.transactions;

		if (transactions.length <= 0) {
			return null;
		} else {
			const monthlyBudget = Number.parseFloat(localStorage.getItem("monthlyBudget"));
			const totalSpent = BudgetChart.calculateTotalSpent(nextProps.transactions);
			const totalRemaining = monthlyBudget - totalSpent;

			console.log(monthlyBudget, totalSpent, totalRemaining);

			// Create chart data set
			const chartData = [
				{ name: 'Spent', value: totalSpent },
				{ name: 'Remaining', value: totalRemaining },
			];

			// Set the state
			return {
				monthlyBudget: monthlyBudget,
				totalSpent: totalSpent,
				totalRemaining: totalRemaining,
				rechartsData: chartData
			};
		}
	}

	updateMonthlyBudget(event) {
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

		return (
			<div className="budget">

				<Input display={this.props.displayInput} updateMonthlyBudget={this.updateMonthlyBudget} monthlyBudget={this.state.monthlyBudget}/>

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
						<Tooltip content={<CustomTooltip data={this.state.rechartsData}/>}/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default BudgetChart;
