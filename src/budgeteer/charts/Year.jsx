import React, { Component } from "react";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
/*import { Doughnut, Bar } from "react-chartjs-2";*/

import subMonths from 'date-fns/sub_months';
import isWithinRange from 'date-fns/is_within_range';

import helpers from '../helpers';

import "../scss/year.scss";

class Year extends Component {

	constructor(props) {
		super(props);

		this.state = {
			monthlyLineChartData: []
		}
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
		this.props.transactions.forEach(t => {

			// get the string value of the month from the transaction
			let transactionMonth = t.date.slice(5, 7);

			// convert it to an int and subtract one for array offset
			transactionMonth = parseInt(transactionMonth) - 1;

			// add the amount of the transaction to its corresponding index in the array
			amounts[transactionMonth] += t.amount;

			// Get the total sum to calculate avg
			avg += t.amount;
		});

		// Divide by 12 and round to two decimal places
		avg = avg / 12;

		let monthsDefault = ["Jan.", "Feb.", "Mar.", "April", "May", "June", "July", "Aug. ", "Sept.", "Oct.", "Nov.", "Dec."];
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
			})
		}

		this.setState({
			monthlyLineChartData: data
		});
	}

	render() {

		/*<Tooltip content={<CustomTooltip/>}/>*/
		return (
			<ResponsiveContainer className="year" width="90%" height={500} >
				<ComposedChart data={this.state.monthlyLineChartData}>
					<CartesianGrid vertical={false} horizontal={true}/>

					<XAxis dataKey="name" tick={{stroke: 'white'}}/>
					<YAxis tick={{stroke: 'white'}}/>

					<Legend />

					<Bar dataKey="Month" stackId="a" fill="rgb(78,  153, 114)" />
					<Line dataKey="Average" stackId="a" fill="blue" />
				</ComposedChart>
			</ResponsiveContainer>

		);
	}
}

export default Year;
