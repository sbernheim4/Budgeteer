import React, { Component } from 'react';
import axios from 'axios';
import { ResponsiveContainer, Label, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';

import isSameMonth from 'date-fns/is_same_month';
import isSameYear from 'date-fns/is_same_year';

import { formatAmount, numberWithCommas } from '../../helpers.js';

import './budgetChart.scss';

const COLORS = ['#D46363', '#007255'];

class BudgetChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			monthlyBudget: 0,
			totalSpent: 0, // Total spent this month
			victoryChartsData: [{ x: 'Spent', y: 0 }, { x: 'Remaining', y: 1 }]
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.transactions.length <= 0) {
			return null;
		} else {
			let today = new Date();
			let totalSpent = 0;

			for (let t of nextProps.transactions) {
				const transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

				if (isSameMonth(transactionDate, today) && isSameYear(transactionDate, today)) {
					totalSpent += Math.abs(t.amount);
				}
			}

			const monthlyBudget = localStorage.getItem('monthlyBudget');
			const remaining = monthlyBudget - totalSpent;

			const victoryChartsData = [{ x: 'Spent', y: totalSpent }, { x: 'Remaining', y: remaining }];

			// Set the state
			return {
				totalSpent: totalSpent,
				monthlyBudget: monthlyBudget,
				victoryChartsData: victoryChartsData
			};
		}
	}

	render() {
		let spent = formatAmount(this.state.totalSpent);
		spent = numberWithCommas(spent);

		let remaining = this.state.monthlyBudget - this.state.totalSpent;
		remaining = formatAmount(remaining);
		remaining = numberWithCommas(remaining);

		return (
			<div className='budget'>
				<VictoryPie
					colorScale={COLORS}
					innerRadius={100}
					text={'# ' + this.props.text}
					labels={() => ''}
					animate={{
						duration: 2500
					}}
					labelComponent={<CustomLabel />}
					data={this.state.victoryChartsData}
				/>
			</div>
		);
	}
}

class CustomLabel extends React.Component {
	render() {
		const spent = numberWithCommas(formatAmount(this.props.data[0].y));
		const remaining = numberWithCommas(formatAmount(this.props.data[1].y));

		return (
			<g>
				<VictoryLabel {...this.props} />
				<VictoryTooltip
					className='tooltip'
					{...this.props}
					x={200}
					y={275}
					text={`Spent: $${spent}\nRemaining: $${remaining}`}
					orientation='top'
					pointerLength={0}
					active={true}
					cornerRadius={75}
					width={150}
					height={150}
				/>
			</g>
		);
	}
}

export default BudgetChart;
