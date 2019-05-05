import React, { Component } from "react";
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Label } from "recharts"

import Input from './Input/input.jsx';
import BannerMessage from './../../BannerMessage/BannerMessage.jsx';

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

			const spent = numberWithCommas(formatAmount(data[0].value));
			const remaining = numberWithCommas(formatAmount(data[1].value));

			return (
				<div className="chart budget--tooltip">
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

	static getMonthlyBudget() {

		const storedMonthlyBudget = Number.parseFloat(localStorage.getItem('monthlyBudget'));

		return storedMonthlyBudget;
	}

	static calculateTotalSpent(transactions) {
		let totalSpent = 0;

		// Filter out any income from the transactions --> Should be accounted for in the monthly budget
		const spendingTransactions = transactions.filter(transaction => {
			return transaction.amount > 0;
		});

		spendingTransactions.forEach(transaction => {
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
			const monthlyBudget = BudgetChart.getMonthlyBudget();
			const totalSpent = BudgetChart.calculateTotalSpent(nextProps.transactions);
			const totalRemaining = monthlyBudget - totalSpent;
			//
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
				rechartsData: chartData,
				overBudget: totalRemaining < 0
			};
		}
	}

	updateMonthlyBudget(event) {
		const newMonthlyBudget = event.target.value.trim();

		// Save data to the current local store
		localStorage.setItem("monthlyBudget", newMonthlyBudget);

		const totalSpent = this.state.totalSpent;
		const newRemaining = newMonthlyBudget - totalSpent;

		// Update the chart
		let rechartsData = [
			{name: 'Spent', value: totalSpent},
			{name: 'Remaining', value: newRemaining},
		];

		this.setState({
			rechartsData: rechartsData,
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

		//const label = `Spent: $${spent}`;

		let message;
		if (this.state.overBudget) {
			message = <BannerMessage display={this.state.displayMessage} text={'You are over budget!!!'}/>

			setTimeout(() => {
				this.setState({
					displayMessage: true
				});
			}, 1000);
		}

		return (
			<section className="chart budget">

				{message}
				<h1>Monthly Budget</h1>

				<Input display={this.props.displayInput} updateMonthlyBudget={this.updateMonthlyBudget} monthlyBudget={this.state.monthlyBudget}/>

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
							{/* <Label className="center-label" fill={"black"} value={label} position="center" /> */}
						</Pie>
						<Tooltip content={<CustomTooltip data={this.state.rechartsData}/>}/>
					</PieChart>
				</ResponsiveContainer>
			</section>
		);
	}
}

export default BudgetChart;
