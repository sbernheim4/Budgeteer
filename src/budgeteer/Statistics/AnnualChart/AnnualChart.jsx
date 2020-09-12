import React, { Component } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { dollarify } from '../../helpers';

import './annualChart.scss';

class CustomTooltip extends Component {
	render() {
		const { active } = this.props;

		if (active) {
			const { payload } = this.props;

			const avg = dollarify(payload[1].value);
			const month = payload[0].payload.name.endsWith('.')
				? payload[0].payload.name.slice(0, -1)
				: payload[0].payload.name;
			const monthAmount = dollarify(payload[0].value);

			return (
				<div className='year--custom-tooltip'>
					<p>
						{month}: ${monthAmount}
					</p>
					<p>Average: ${avg}</p>
				</div>
			);
		}

		return null;
	}
}

class AnnualChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			monthlyLineChartData: []
		};
	}

	componentDidMount() {
		this.generateMonthlyBarChart();
	}

	componentWillReceiveProps() {
		this.generateMonthlyBarChart();
	}

	generateMonthlyBarChart() {
		// Ensure the order of the date is chronological not just based on jan - dec.

		/* Sum up costs by week */
		let amounts = new Array(12);
		amounts.fill(0);

		let avg = 0;
		this.props.transactions.forEach((t) => {
			if (t.amount > 0) {
				// get the string value of the month from the transaction
				let transactionMonth = t.date.slice(5, 7);

				// convert it to an int and subtract one for array offset
				transactionMonth = parseInt(transactionMonth) - 1;

				// add the amount of the transaction to its corresponding index in the array
				amounts[transactionMonth] += t.amount;

				// Get the total sum to calculate avg
				avg += t.amount;
			}
		});

		// Divide by 12 and round to two decimal places
		avg = avg / 12;

		let monthsDefault = [
			'Jan.',
			'Feb.',
			'Mar.',
			'April',
			'May',
			'June',
			'July',
			'Aug. ',
			'Sept.',
			'Oct.',
			'Nov.',
			'Dec.'
		];
		let currMonth = new Date().getMonth(); // 0

		// Normalize the labels and amounts array to match up properly and always display the current month/current amount at the end
		let orderedLabels = [];
		for (let i = currMonth + 1; i <= monthsDefault.length + currMonth; i++) {
			orderedLabels.push(monthsDefault[i % 12]);
		}

		let orderedAmounts = [];
		for (let i = currMonth + 1; i <= monthsDefault.length + currMonth; i++) {
			orderedAmounts.push(amounts[i % 12]);
		}

		let data = [];
		for (let i = 0; i < 12; i++) {
			data.push({
				name: orderedLabels[i],
				Average: parseInt(avg),
				Month: parseInt(orderedAmounts[i])
			});
		}

		this.setState({
			monthlyLineChartData: data
		});
	}

	render() {
		/*<Tooltip content={<CustomTooltip/>}/>*/
		return (
			<ResponsiveContainer className='chart year' width='100%' height={400}>
				<ComposedChart data={this.state.monthlyLineChartData}>
					<CartesianGrid vertical={false} horizontal={true} />

					<XAxis dataKey='name' tick={{ stroke: 'black' }} />
					<YAxis tick={{ stroke: 'black' }} />

					<Legend />
					<Tooltip content={<CustomTooltip />} />

					<Bar dataKey='Month' stackId='a' fill='rgb(78,  153, 114)' />
					<Line strokeWidth={6} dot={false} dataKey='Average' stackId='a' fill='blue' />
				</ComposedChart>
			</ResponsiveContainer>
		);
	}
}

export default AnnualChart;
