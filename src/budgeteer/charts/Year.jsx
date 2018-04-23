import React, { Component } from "react";
import { Doughnut, Bar } from "react-chartjs-2";

import subMonths from 'date-fns/sub_months';
import isWithinRange from 'date-fns/is_within_range';

import helpers from '../helpers';

import "../scss/year.scss";

class Year extends Component {

	constructor(props) {
		super(props);

		this.state = {
			monthlyLineChartData: {},
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
		avg = helpers.formatAmount(avg);

		// Round the amounts to two decimals
		amounts = amounts.map(val => {
			return helpers.formatAmount(val);
		});

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

		const lineData = {
			labels: orderedLabels,
			datasets: [{
				type: "line",
				data: new Array(12).fill(avg),
				label: "Avg. Monthly Spending",
				radius: 0,
				borderColor: "#EC932F",
				backgroundColor: "#EC932F",
				pointBorderColor: "#EC932F",
				pointBackgroundColor: "#EC932F",
				pointHoverBackgroundColor: "#EC932F",
				pointHoverBorderColor: "#EC932F",
				fill: false
			},
			{
				type: "bar",
				data: orderedAmounts,
				label: "Monthly Spending",
				backgroundColor: "rgb(77, 153, 114)",
				hoverBorderColor: "rgb(77, 153, 114)",
				hoverBackgroundColor: "rgb(60, 119, 89)"
			}],
			options: {
				responsive: true,
				maintainAspectRatio: true,
			}
		};

		this.setState({
			monthlyLineChartData: lineData
		});
	}

	render() {

		let barOptions = {
			legend: {
				position: "bottom",
				display: true
			},
			scales: {
				yAxes: [{
					ticks: {
						callback: function(value, index, values) {
							return '$' + helpers.numberWithCommas(value);
						}
					}
				}]
			}
		}

		return <Bar className="yearly-budget" options={barOptions} data={this.state.monthlyLineChartData} />
	}
}

export default Year;
