import React, { Component } from 'react';
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

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

		}

		return null;

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

	componentDidMount() {

		if (this.state.overBudget && updated === false) {
			// Wait 500ms before displaying the banner
			setTimeout(() => {
				this.displayMessage('You are over budget!', 'red');
			}, 500);

			updated = true;
		}

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

		const totalSpent = transactions.reduce((acc, curr) => {

			// Multiply by -1 since spending is returned as a positive number and income
			// as a negative number (spending should really be considered negative and
			// income as positive)
			return (curr.amount * -1) + acc;

		}, 0);

		return totalSpent;
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const transactions = nextProps.transactions;

		if (transactions.length <= 0) {

			const monthlyBudget = BudgetChart.getMonthlyBudget();

			return {
				monthlyBudget: monthlyBudget,
				totalSpent: 0,
				totalRemaining: 0,
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

		axios({
			method: 'POST',
			url: '/user-info/monthly-budget',
			data: {
				monthlyBudget: newMonthlyBudget
			}
		});

		this.setState({
			rechartsData: rechartsData,
			monthlyBudget: newMonthlyBudget,
			overBudget: newRemaining < 0
		}, () => {

			if (this.state.overBudget) {
				this.displayMessage('You are over budget!', 'red');
			}

		});

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

		return (
			<section className='budget'>

				<BannerMessage
					color={this.state.color}
					display={this.state.display}
					text={this.state.message}
				/>

				<h1>Monthly Budget</h1>

				<Input
					display={this.props.displayInput}
					updateMonthlyBudget={this.updateMonthlyBudget}
					monthlyBudget={this.state.monthlyBudget}
				/>

				<ResponsiveContainer
					className='budget--doughnut-chart'
					width='100%'
					min-height={400}
					height={400}
				>
					<PieChart>
						<Pie
							dataKey='value'
							data={this.state.rechartsData}
							innerRadius='50%'
							outerRadius='90%'
							fill='#8884d8'
							paddingAngle={0}>
							{this.state.rechartsData.map((_entry, index) => (
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
