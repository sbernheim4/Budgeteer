import React, { Component } from 'react';
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Label } from 'recharts';

import Input from './Input/input.jsx';
import BannerMessage from './../../BannerMessage/BannerMessage.jsx';

import { dollarify } from '../../helpers.js';

import './budgetChart.scss';

const COLORS = ['#D46363', '#007255'];

class CustomTooltip extends Component {
	render() {
		const { active, data } = this.props;

		if (active) {
			const spent = dollarify(data[0].value);
			const remaining = dollarify(data[1].value);

			return (
				<div className='chart budget--tooltip'>
					<p className='budget--tooltip--spent'>Spent: ${spent}</p>
					<p className='budget--tooltip--remaining'>Remaining: ${remaining}</p>
				</div>
			);
		} else {
			return null;
		}
	}
}

let updated = false;

class BudgetChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			monthlyBudget: 0,
			totalSpent: 0,
			totalRemaining: 0,
			rechartsData: [{ name: 'Spent', value: 0 }, { name: 'Remaining', value: 1 }]
		};

		this.updateMonthlyBudget = this.updateMonthlyBudget.bind(this);
	}

	componentDidUpdate() {
		// Note: Use `updated` here to prevent an infinite loop as calling
		// this.displayMessage updates state which causes cDU to be called again etc
		if (this.state.overBudget && updated === false) {
			// Wait 500ms before displaying the banner
			setTimeout(() => {
				this.displayMessage('You are over budget!', 'red');
			}, 500);

			updated = true;
		}
	}

	static getMonthlyBudget() {
		const rawMonthlyBudget = localStorage.getItem('monthlyBudget');
		const monthlyBudget = Number.parseFloat(rawMonthlyBudget);

		return monthlyBudget;
	}

	static calculateTotalSpent(transactions) {
		let totalSpent = 0;

		// Filter out any income from the transactions --> Should be accounted for in the monthly budget
		const spendingTransactions = transactions.filter((transaction) => {
			return transaction.amount > 0;
		});

		spendingTransactions.forEach((transaction) => {
			totalSpent += transaction.amount;
		});

		const roundedTotalSpent = Number.parseFloat(totalSpent.toFixed(2));

		return roundedTotalSpent;
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const transactions = nextProps.transactions;

		if (transactions.length <= 0) {

			const monthlyBudget = BudgetChart.getMonthlyBudget();

			return {
				monthlyBudget: monthlyBudget,
				totalSpent: 0,
				totalRemaining: 1,
				rechartsData: [],
				overBudget: false
			}

		} else {

			const monthlyBudget = BudgetChart.getMonthlyBudget();
			const totalSpent = BudgetChart.calculateTotalSpent(nextProps.transactions);
			const totalRemaining = monthlyBudget - totalSpent;

			const chartData = [
				{ name: 'Spent', value: totalSpent },
				{ name: 'Remaining', value: totalRemaining }
			];

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
		localStorage.setItem('monthlyBudget', newMonthlyBudget);

		const totalSpent = this.state.totalSpent;
		const newRemaining = newMonthlyBudget - totalSpent;

		let rechartsData = [
			{ name: 'Spent', value: totalSpent },
			{ name: 'Remaining', value: newRemaining }
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

		const overBudget = newRemaining < 0;
		if (overBudget) {
			this.displayMessage('You are over budget!', 'red');
		}
	}

	displayMessage(text, color) {
		this.setState({
			display: true,
			message: text,
			color: color
		});

		setTimeout(() => {
			this.setState({
				display: false
			});
		}, 5500);
	}

	render() {
		let spent = this.state.totalSpent;
		spent = dollarify(spent);

		let remaining = this.state.totalSpent;
		remaining = dollarify(remaining);

		return (
			<section className='budget'>

				<BannerMessage color={this.state.color} display={this.state.display} text={this.state.message} />

				<h1>Monthly Budget</h1>

				<Input
					display={this.props.displayInput}
					updateMonthlyBudget={this.updateMonthlyBudget}
					monthlyBudget={this.state.monthlyBudget}
				/>

				<ResponsiveContainer className='budget--doughnut-chart' width='100%' min-height={400} height={400}>
					<PieChart>
						<Pie
							dataKey='value'
							data={this.state.rechartsData}
							innerRadius='50%'
							outerRadius='90%'
							fill='#8884d8'
							paddingAngle={0}>
							{this.state.rechartsData.map((entry, index) => (
								<Cell key={index} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip content={<CustomTooltip data={this.state.rechartsData} />} />
					</PieChart>
				</ResponsiveContainer>
			</section>
		);
	}
}

export default BudgetChart;
