import React, { Component } from 'react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import subWeeks from 'date-fns/subWeeks';
import isWithinInterval from 'date-fns/isWithinInterval';
import differenceInDays from 'date-fns/differenceInDays';

import { dollarify, formatAmount, isNumber } from '../../helpers';

import './weekSpendingChart.scss';

class CustomTooltip extends Component {

	render() {

		const { active } = this.props;

		if (active) {
			const { payload, label } = this.props;

			if (payload !== null) {
				const normalizedLabel = typeof label === 'string' ? label : label + ' day(s) ago';
				const amount = dollarify(payload[0].value);

				return (
					<div className='week-spending-chart--custom-tooltip'>
						<p>{normalizedLabel}</p>
						<p>${amount}</p>
					</div>
				);
			}

			return null;
		}

		return null;
	}
}

class WeekSpendingChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			totalSpent: '...'
		};

		this.updateDimensions = this.updateDimensions.bind(this);
		this.formatTooltipText = this.formatTooltipText.bind(this);
	}

	static getDerivedStateFromProps(nextProps) {
		if (nextProps.transactions.length <= 0) {
			return null;
		}

		const end = new Date();
		const start = subWeeks(end, 1);

		let startingIndex = 0;

		for (let [index, t] of nextProps.transactions.entries()) {

			const transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			// Get the index of the first transaction to fall inside this week's range
			if (isWithinInterval(transactionDate, { start, end } )) {
				startingIndex = index;
				break;
			}

			// If we get through the whole array and haven't yet returned it means there
			// are no transactions which fall within our range
			if (index === nextProps.transactions.length - 1) {
				startingIndex = 0;
			}

		}

		let currentWeekAmounts = new Array(7).fill(0);

		if (startingIndex !== 0) {
			const pastWeekTransactions = nextProps.transactions.slice(startingIndex);

			pastWeekTransactions.forEach((t) => {
				let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));
				const index = differenceInDays(end, transactionDate);

				currentWeekAmounts[index] += t.amount;
			});

			currentWeekAmounts.reverse();
		}

		const week = ['Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.', 'Sun.'];
		const rechartsData = []; // Recharts Data

		const today = new Date().getDay();
		let pastWeekTotal = 0;

		// Values for the range of the chart
		let rangeMax = 0;
		let rangeMin = 0;

		for (let i = 0; i < 7; i++) {

			// Multiple by -1 since spending is viewed as positive and income as negative
			const amt = parseInt(formatAmount(currentWeekAmounts[i] * -1));

			rechartsData.push({
				name: i === 6 ? 'Today' : week[(today + i) % 7],
				// Multiple by -1 since spending is viewed as positive and income as negative
				value: currentWeekAmounts[i] * -1
			});

			// Get the total amount spent this week
			pastWeekTotal += currentWeekAmounts[i];

			// Determine the range for the chart
			if (amt > rangeMax) rangeMax = amt;
			if (amt < rangeMin) rangeMin = amt;
		}

		rangeMax = rangeMax === 0 ? 50 : rangeMax;
		const range = [rangeMin, rangeMax];

		return {
			rechartsData: rechartsData,
			totalSpent: pastWeekTotal * -1,
			range: range
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}

	updateDimensions(event) {
		this.setState({
			chartWidth: event.target.innerWidth
		});
	}

	formatTooltipText(datum) {
		const amount = datum.y;
		const formattedAmount = dollarify(Math.abs(amount));
		return amount > 0 ? `Received $${formattedAmount}` : `Spent ${formattedAmount}`;
	}

	render() {
		const totalSpent = isNumber(this.state.totalSpent) ? `$${dollarify(this.state.totalSpent)}` : 'Loading...';
		const amtColor = totalSpent <= 0 && isNumber(totalSpent) ? 'red' : 'green';

		return (
			<div>
				<h1 className='total-spent'>
					Past 7 Days: <span className={amtColor}>{totalSpent}</span>
				</h1>

				<div className='recharts'>
					<ResponsiveContainer className='week-spending-chart' width='90%' height={200}>
						<ComposedChart data={this.state.rechartsData}>
							<CartesianGrid vertical={false} horizontal={true} />
							<XAxis dataKey='name' tick={{ stroke: 'black' }} /> <YAxis tick={{ stroke: 'black' }} />
							<Tooltip content={<CustomTooltip />} />
							<Bar barSize={8} dataKey='value' stackId='a' fill='rgb(78,  153, 114)' />
						</ComposedChart>
					</ResponsiveContainer>
				</div>
			</div>
		);
	}
}

export default WeekSpendingChart;
