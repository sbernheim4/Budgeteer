import React, { Component } from "react";
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip, VictoryLabel } from 'victory';

import subWeeks from 'date-fns/sub_weeks';
import isWithinRange from 'date-fns/is_within_range';
import differenceInDays from 'date-fns/difference_in_days';

import { numberWithCommas, formatAmount, isNumber } from '../../helpers';

import "./weekSpendingChart.scss";

class CustomTooltip extends Component {

	render() {
		const { active } = this.props;

		if (active) {
			const { payload, label } = this.props;

			if (payload !== null) {
				const normalizedLabel = typeof label === "string" ? label : label + " day(s) ago";
				const amount = numberWithCommas(formatAmount(payload[0].value));

				return (
					<div className="week-spending-chart--custom-tooltip">
						<p>{normalizedLabel}</p>
						<p>${amount}</p>
					</div>
				);
			}

			return null;
		}

		return null;
	}
};

class WeekSpendingChart extends Component {
	constructor(props) {
		super(props)

		this.state = {
			weekData: [],
			totalSpent: '...'
		};

		this.updateDimensions = this.updateDimensions.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.transactions.length > 0) {

			// this is off, need to get all the transactions in the past 7 days
			// sum up the total spent for each day
			const endDate = new Date();
			const startDate = subWeeks(endDate, 1);

			let startingIndex = 0;

			for (let [index, t] of nextProps.transactions.entries()) {
				const transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

				// Get the index of the first transaction to fall inside the range
				if (isWithinRange(transactionDate, startDate, endDate)) {
					startingIndex = index;
					break;
				}

				// If we get through the whole array and haven't yet returned it means there
				// are no transactions which fall within our range
				if (index === nextProps.transactions.length - 1) {
					startingIndex = 0;
				}
			}

			let amts = new Array(7).fill(0);

			if (startingIndex !== 0) {
				const pastWeekTransactions = nextProps.transactions.slice(startingIndex);

				pastWeekTransactions.forEach(t => {
					let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));
					const index = differenceInDays(endDate, transactionDate);

					amts[index] += t.amount;
				});

				amts.reverse();
			}

			const week = ["Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat.", "Sun."];
			let data = [];
			let data2 = [];

			const today = new Date().getDay();
			let pastWeekTotal = 0;

			for (let i = 0; i < 7; i++) {
				const amt = parseInt(formatAmount(amts[i] * -1)) // Multiple by -1 since spending is viewed as positive and income as negative
				data.push({
					x: i === 6 ? "Today" : week[(today + i) % 7],
					y: amt,
					label: amt < 0 ? `Spent: $${numberWithCommas(formatAmount(amt))}` : `Received $${numberWithCommas(formatAmount(amt))}`
				});

				pastWeekTotal += amts[i];
			}

			for (let i = 0; i < 7; i++) {
				data2.push({
					name: i === 6 ? "Today" : week[(today + i) % 7],
					value: amts[i] * -1 // Multiple by -1 since spending is viewed as positive and income as negative
				});
			}

			console.log(data);

			return {
				weekData: data,
				recharts: data2,
				totalSpent: pastWeekTotal * -1
			}
		}

		return null;
	}

	componentDidMount() {
		this.setState({
			chartWidth: window.innerWidth
		});

		window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}

	updateDimensions(event) {
		this.setState({
			chartWidth: event.target.innerWidth
		})
	}

	render() {

		const totalSpent = isNumber(this.state.totalSpent) ? this.state.totalSpent.toFixed(2) : 'Loading...';
		const amtColor = totalSpent <= 0 && isNumber(totalSpent) ? 'red' : 'green';

		return (
			<div>
				<h1 className='total-spent'>This Week's Bottom Line: <span className={amtColor}>${totalSpent}</span></h1>

				<div className='victory-chart'>
					<svg viewBox={"0 0" + " " + this.state.chartWidth + " " + "350"} preserveAspectRatio="none" width="100%">
						<VictoryChart
							domainPadding={{ x: 40 }}
							standalone={false}
							width={this.state.chartWidth}
							height={350}
						>

							<VictoryBar standalone={false} labelComponent={<VictoryTooltip />}
								barWidth={10}
								style={{ data: { fill: "rgb(78,  153, 114)" } }}
								data={this.state.weekData}
							/>

							<VictoryAxis
								crossAxis
								tickCount={3}
								orientation="bottom"
								tickLabelComponent={<VictoryLabel />}
								// fixLabelOverlap={true}
								style={{
									axis: { stroke: "black" },
									tickLabels: { fontSize: 30 },
								}}
							/>
							<VictoryAxis
								dependentAxis
								style={{
									axis: { stroke: "black" },
									grid: { stroke: "rgb(222, 222, 222)" },
									tickLabels: { fontSize: 30 },
								}}
							/>
						</VictoryChart>
					</svg>

				</div>

				<ResponsiveContainer className="week-spending-chart" width="90%" height={200} >
					<ComposedChart data={this.state.recharts}>
						<CartesianGrid vertical={false} horizontal={true} />

						<XAxis dataKey="name" tick={{ stroke: 'black' }} /> <YAxis tick={{ stroke: 'black' }} />

						<Tooltip content={<CustomTooltip />} />

						<Bar barSize={8} dataKey="value" stackId="a" fill="rgb(78,  153, 114)" />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default WeekSpendingChart;
