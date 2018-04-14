/* eslint no-undefined: 0 */
import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";

import startOfWeek from "date-fns/start_of_week";
import endOfWeek from "date-fns/end_of_week";
import differenceInCalendarWeeks from "date-fns/difference_in_calendar_weeks";
import isSameWeek from "date-fns/is_same_week";
import isWeekend from "date-fns/is_weekend";

import helpers from '../helpers';
import "../scss/weekweekendchart.scss";

class WeekWeekendChart extends Component {

	constructor(props) {
		super(props);

		this.generateLineChart = this.generateLineChart.bind(this);
		this.generateLineChartLabels = this.generateLineChartLabels.bind(this);

		this.state = {
			weekVsWeekend: {}
		}
	}

	componentDidMount() {
		this.generateLineChart();
	}

	generateLineChart() {

		// Sort the transactions from oldest to newest --> [oldest, ..., newest]
		let sortedTransactions = this.props.transactions.sort((a, b) => {
			// a and b are transactions
			let dateA = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateB = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateA - dateB;
		});

		// Only really care about the past 6 months, not a full year
		let pastSixMonths = sortedTransactions.slice(this.props.transactions.length / 2);

		if (pastSixMonths[0] === undefined) {
			// account info was not properly loaded --> send them back to the homepage
			const errorMessage = document.querySelector('.app-error');
			errorMessage.innerHTML = `<p>Hmmm. We had trouble properly loading your data. Please try refreshing the page.</p>`;
			errorMessage.classList.add('app-error__display');

			setTimeout(() => {
				errorMessage.classList.remove('app-error__display')
			}, 4000);
		}

		// Start date is the Monday following the first transaction
		let firstDate = pastSixMonths[0].date;
		let startWeek = new Date(firstDate.slice(0, 4), firstDate.slice(5, 7) - 1, firstDate.slice(8, 10));
		startWeek = startOfWeek(startWeek, { weekStartsOn: 1 });
		let currentWeek = startWeek;

		// End week is always the current week - 1 --> This is because data for
		// the current week is definitionally incomplete so I can only get
		// complete information for last week
		let endWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

		// Arrays only need to be as large as how many weeks have passed in the year so far
		// [week 1, week 2, week 3, ... week n - 1, week n] where n is the current week
		let arrSize = differenceInCalendarWeeks(endWeek, startWeek);
		let weekday = new Array(arrSize).fill(0);
		let weekend = new Array(arrSize).fill(0);

		let counter = 0;

		pastSixMonths.forEach(t => {
			let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			// if the transaction date is the same week as the current week
			if (isSameWeek(currentWeek, transactionDate) && t.amount > 0) {

				// determine if it goes in the weekend or weekday array
				if (isWeekend(transactionDate)) {
					weekend[counter] += t.amount;
				} else {
					weekday[counter] += t.amount;
				}
			} else if (t.amount > 0) {
				// I"ve moved to a different week so update counter index to advance as many weeks as necessary

				// NOTE: For example, transaction 1 could have been on 1/1/2018 but transaction 2 on 1/15/2018 so
				// counter would need to advance by 2 not just 1
				counter += differenceInCalendarWeeks(transactionDate, currentWeek);

				// Put the current transaction amount in the right array
				if (isWeekend(transactionDate)) {
					weekend[counter] += t.amount;
				} else {
					weekday[counter] += t.amount;
				}

				// update currentWeek to be the start of the week of the transaction date
				currentWeek = startOfWeek(transactionDate, { weekStartsOn: 1 });
			}
		});

		// Format values in the array to two decimals
		weekday.forEach( (val, index) => {
			weekday[index] = helpers.formatAmount(val)
		});

		weekend.forEach((val, index) => {
			weekday[index] = helpers.formatAmount(val)
		});

		const chartData = {
			labels: this.generateLineChartLabels(arrSize),
			datasets:  [
				{
					// Having the same stack means the two data sets will be stacked on top of each other.
					stack: "Stack 0",
					data:  weekday,
					// fill:  false,
					label:  "Week",
					backgroundColor: "rgb(77,  153, 114)",
				},
				{
					stack: "Stack 0",
					data: weekend,
					// fill: false,
					label: "Weekend",
					backgroundColor: "rgb(52, 108, 161)",
				}
			]
		}

		this.setState({
			weekVsWeekend: chartData
		});
	}

	generateLineChartLabels(length) {
		let arr = [];
		for (let i = length; i > 1; i--) {
			arr.push(i);
		}

		arr.push("Last Week");
		arr.push("This Week");

		return arr;
	}

	render() {

		const barOptions = {
			tooltips: {
				callbacks: {
					title: function(item) {
						// Less than 12 exception to ignore the Yesterday and Today values in the labels
						return item[0].xLabel + " Week(s) Ago";
					},
					label: function(item) {
						const amt = helpers.numberWithCommas(helpers.formatAmount(item.yLabel));
						return "Spent $" + amt;
						// Show the user `Spent $17.20` or `Received $17.20` --> need the
						// formatAmount again since multiplying by -1 removes the trailing 0
						// decimal
					}
				}
			},
			title: {
				display: true,
				text: "Week Vs Weekwend Spending",
				fontSize: 20
			},
			scales: {
				xAxes: [{
					barThickness: 15,
					// ticks: {
					// 	fontSize: 15
					// }
				}],
				yAxes: [{
					barThickness: 15,
					ticks: {
						// fontSize: 15,
						callback: function(value, index, values) {
							return '$' + helpers.numberWithCommas(value);
						}
					}
				}]
			}
		}

		return <Bar data={this.state.weekVsWeekend} options={barOptions} />
	}
}

export default WeekWeekendChart;
