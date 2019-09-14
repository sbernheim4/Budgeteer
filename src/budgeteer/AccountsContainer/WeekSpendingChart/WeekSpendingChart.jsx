import React, { Component } from 'react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip, VictoryLabel } from 'victory';

import subWeeks from 'date-fns/subWeeks';
import isWithinInterval from 'date-fns/isWithinInterval';
import differenceInDays from 'date-fns/differenceInDays';

import { numberWithCommas, formatAmount, isNumber } from '../../helpers';

import './weekSpendingChart.scss';

class CustomTooltip extends Component {
	render() {
		const { active } = this.props;

		if (active) {
			const { payload, label } = this.props;

			if (payload !== null) {
				const normalizedLabel = typeof label === 'string' ? label : label + ' day(s) ago';
				const amount = numberWithCommas(formatAmount(payload[0].value));

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
			victoryChartsData: [],
			totalSpent: '...'
		};

		this.updateDimensions = this.updateDimensions.bind(this);
		this.formatTooltipText = this.formatTooltipText.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.transactions.length <= 0) {
			return null;
		} else {
			const endDate = new Date();
			const startDate = subWeeks(endDate, 1);

			let startingIndex = 0;

			for (let [index, t] of nextProps.transactions.entries()) {
				const transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

				// Get the index of the first transaction to fall inside this week's range
				if (isWithinInterval(transactionDate, startDate, endDate)) {
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
					const index = differenceInDays(endDate, transactionDate);

					currentWeekAmounts[index] += t.amount;
				});

				currentWeekAmounts.reverse();
			}

			const week = ['Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.', 'Sun.'];

			let data = []; // VictoryCharts Data
			let data2 = []; // Recharts Data

			const today = new Date().getDay();
			let pastWeekTotal = 0;

			// Values for the range of the chart
			let rangeMax = 0;
			let rangeMin = 0;

			for (let i = 0; i < 7; i++) {
				const amt = parseInt(formatAmount(currentWeekAmounts[i] * -1)); // Multiple by -1 since spending is viewed as positive and income as negative

				data.push({
					x: i === 6 ? 'Today' : week[(today + i) % 7],
					y: amt,
					label:
						amt < 0
							? `Spent: $${numberWithCommas(formatAmount(amt))}`
							: `Received $${numberWithCommas(formatAmount(amt))}`
				});

				data2.push({
					name: i === 6 ? 'Today' : week[(today + i) % 7],
					value: currentWeekAmounts[i] * -1 // Multiple by -1 since spending is viewed as positive and income as negative
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
				victoryChartsData: data,
				rechartsData: data2,
				totalSpent: pastWeekTotal * -1,
				range: range
			};
		}
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
		const formattedAmount = numberWithCommas(formatAmount(Math.abs(amount)));
		return amount > 0 ? `Received $${formattedAmount}` : `Spent ${formattedAmount}`;
	}

	render() {
		const totalSpent = isNumber(this.state.totalSpent) ? this.state.totalSpent.toFixed(2) : 'Loading...';
		const amtColor = totalSpent <= 0 && isNumber(totalSpent) ? 'red' : 'green';

		const width = this.state.chartWidth || window.innerWidth;

		return (
			<div>
				<h1 className='total-spent'>
					Past 7 Days: <span className={amtColor}>${totalSpent}</span>
				</h1>

				{/* <div className='victory-chart'>
					<svg viewBox={"0 0 " + width + " 350"} preserveAspectRatio="none" width="100%">
						<VictoryChart
							domain={ {y: this.state.range} }
							domainPadding={{ x: 50 }}
							standalone={false}
							width={this.state.chartWidth}
							height={350}
							standalone={false}
						>

							<VictoryBar
								data={this.state.victoryChartsData}
								style={{ data: { fill: "rgb(78,  153, 114)" } }}
								barWidth={10}
								labelComponent={<VictoryTooltip
									renderInPortal={true}
									text={(datum) => this.formatTooltipText(datum)}
									style={{ fontSize: 25 }}
								/>}
							/>

							<VictoryAxis
								crossAxis
								tickCount={3}
								orientation="bottom"
								tickLabelComponent={<VictoryLabel />}
								fixLabelOverlap={true}
								style={{
									axis: { stroke: "black" },
									tickLabels: { fontSize: 30 },
								}}
							/>

							<VictoryAxis
								dependentAxis
								fixLabelOverlap={true}
								style={{
									axis: { stroke: "black" },
									grid: { stroke: "rgb(222, 222, 222)" },
									tickLabels: { fontSize: 20 },
								}}
							/>
						</VictoryChart>
					</svg>
				</div> */}

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
