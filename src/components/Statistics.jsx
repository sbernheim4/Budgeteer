/* eslint no-undef: 0*/
/* eslint no-undefined: 0*/

import React, { Component } from "react";

import { Doughnut, Line, Bar } from "react-chartjs-2";
import Budget from "./Budget.jsx";

import isWeekend from "date-fns/is_weekend";
import isSameWeek from "date-fns/is_same_week";
import differenceInCalendarWeeks from "date-fns/difference_in_calendar_weeks";
import startOfWeek from "date-fns/start_of_week";
import addWeeks from "date-fns/add_weeks";
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import subMonths from 'date-fns/sub_months';
import isWithinRange from 'date-fns/is_within_range';

import helpers from './helpers';

import "../scss/statistics.scss";

Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.elements.arc.borderColor = "rgba(0, 0, 0, 0)";

class Statistics extends Component {
	constructor(props) {
		super(props);

		this.changeChart = this.changeChart.bind(this);

		this.state = {
			categoryDoughnutData: {},
			monthlyLineChartData: {},
			bubbleChartData: {},
			weekVsWeekend: {}
		}
	}

	componentWillReceiveProps (nextProps) {

		if (nextProps.transactions.length > 0) {
			// Calculate all the data for the different charts once the
			// component has received valid props

			// TODO: these functions should be asynchronous
			this.generateDoughnutChart();
			this.generateMonthlyBarChart();
			this.generateLineChart();

			this.changeChart('spendingAnalysis');
		}
	}

	/************************************* Doughnut Chart *************************************/

	calculateDoughnutInfo() {
		// Initialize a new array of size 8 and fill it with 0s initially
		let amts = new Array(14);
		amts.fill(0);
		const now = new Date();
		const oneMonthAgo = subMonths(now, 1);

		this.props.transactions.forEach(t => {
			let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			if (isWithinRange(transactionDate, oneMonthAgo, now)) {
				let category = (t.category || [""])[0];
				let amount = t.amount;

				// TODO: Try cleaning up the switch statements to something like this
				// amts[t.category] += t.amount;

				switch (category) {
					case "Food and Drink":
						amts[0] += amount;
						break;
					case "Travel":
						amts[1] += amount;
						break;
					case "Shops":
						amts[2] += amount;
						break;
					case "Recreation":
						amts[3] += amount;
						break;
					case "Service":
						amts[4] += amount;
						break;
					case "Community":
						amts[5] += amount;
						break;
					case "Healthcare":
						amts[6] += amount;
						break;
					case "Bank Fees":
						amts[7] += amount;
						break;
					case "Cash Advance":
						amts[8] += amount;
						break;
					case "Interest":
						amts[9] += amount;
						break;
					case "Payment":
						amts[10] += amount;
						break;
					case "Tax":
						amts[11] += amount;
						break;
					case "Transfer":
						amts[12] += amount;
						break;
					default:
						amts[13] += amount
				}
			}
		});

		// Normalize each value to always have two decimals
		amts = amts.map(val => {
			return helpers.formatAmount(val);
		});

		let labelsArray = [];
		let newAmts = [];

		let defaultLabelsArray = ["Food and Drink", "Travel", "Shops", "Recreation", "Service", "Community", "Healthcare", "Bank Fees", "Cash Advance", "Interest", "Payment", "Tax", "Transfer", "Other"];

		// Only keep amounts and labels for values that are not 0
		for (let i = 0; i < amts.length; i++) {
			if (amts[i] !== "0.00") {
				labelsArray.push(defaultLabelsArray[i]);
				newAmts.push(amts[i]);
			}
		}

		return {
			labels: labelsArray,
			amounts: newAmts
		};
	}

	generateDoughnutChart() {
		// get the data array
		let info = this.calculateDoughnutInfo();
		const data = {
			labels: info.labels,
			datasets: [{
				data: info.amounts,
				backgroundColor: ["#578CA9", "#F6D155", "#004B8D", "#F2552C", "#95DEE3", "#CE3175", "#5A7247", "#CFB095", "#578CA9", "#f4d942", "#afc47d", "#558244", "#347759", "#2d7582"]
			}],
			options: {
				responsive: true,
				maintainAspectRatio: true,
			}
		};
		this.setState({ categoryDoughnutData: data });
	}

	/************************************* End Doughnut Chart *************************************/


	/************************************* Bar Chart *************************************/

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

		this.setState({ monthlyLineChartData: lineData });
	}

	/************************************* End Bar Chart *************************************/



	/************************************* Line Chart *************************************/

	//
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

		// if (pastSixMonths[0] === undefined) {
		// 	// account info was not properly loaded --> send them back to the homepage
		// 	const errorMessage = document.querySelector('.app-error');
		// 	errorMessage.classList.add('app-error__display');

		// 	setTimeout(() => {
		// 		errorMessage.classList.remove('app-error__display')
		// 	}, 4000)
		// }

		// Start date is the Monday following the first transaction
		let firstDate = pastSixMonths[0].date;
		let startWeek = new Date(firstDate.slice(0, 4), firstDate.slice(5, 7) - 1, firstDate.slice(8, 10));
		// startWeek = addWeeks(startWeek, 1);
		startWeek = startOfWeek(startWeek, { weekStartsOn: 1 });
		let currentWeek = startWeek;

		// End week is always the current week - 1 --> This is because data for
		// the current week is definitionally incomplete so I can only get
		// complete information for last week
		let endWeek = new Date();
		endWeek = startOfWeek(endWeek, { weekStartsOn: 1 });

		// Arrays only need to be as large as how many weeks have passed in the year so far
		// [week 1, week 2, week 3, ... week n - 1, week n] where n is the current week
		let arrSize = differenceInCalendarWeeks(endWeek, startWeek);
		let weekday = new Array(arrSize).fill(0);
		let weekend = new Array(arrSize).fill(0);

		let counter = 0;
		let falsePos = 0;

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

				// NOTE: For example transaction 1 could have been on 1/1/2018 but transaction 2 on 1/15/2018 so
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
		})

		weekend.forEach((val, index) => {
			weekday[index] = helpers.formatAmount(val)
		})

		const chartData = {
			labels: this.generateLineChartLabels(arrSize),
			label: "Week vs Weekend Spending for the past 52 Weeks",
			datasets:  [
				{
					stack: "Stack 0",
					data:  weekday,
					fill:  false,
					label:  "Week",
					backgroundColor: "rgb(77,  153, 114)",
				},
				{
					stack: "Stack 0",
					data: weekend,
					fill: false,
					label: "Weekend",
					backgroundColor: "rgb(52, 108, 161)",
				}
			],
			options: {
				title: {
					display: true,
					text: "Week vs Weekend Spending"
				},
				responsive: false,
				scales: {
					xAxes: [{
						stacked: true
					}]
				}
			}
		}

		this.setState({
			weekVsWeekend: chartData
		});
	}

	generateLineChartLabels(length) {
		let arr = [];
		for (let i = length; i > 0; i--) {
			arr.push(i);
		}

		return arr;
	}

	changeChart(chartType) {
		let chartDisplay;

		let tempOptions = {
			legend: {
				position: "bottom",
				display: true
			}
		}

		if (chartType === "spendingAnalysis") {
			chartDisplay = <div className="stats--spending">
				<div className="stats--spending--doughnut">
					<Doughnut options={tempOptions} data={this.state.categoryDoughnutData} />
				</div>
				<hr />
				<div className="stats--spending--line-chart">
					<Bar options={tempOptions} data={this.state.monthlyLineChartData} />
				</div>
			</div>
			} else if (chartType === "monthlyBudget") {
				chartDisplay = <Budget transactions={this.props.transactions}/>
				} else {
					chartDisplay = <div className="stats--week-weekend"> <Bar data={this.state.weekVsWeekend} /> </div>
					}

		document.querySelectorAll(`button`).forEach(btn => {
			btn.classList.remove("active");
		});
		document.querySelector("." + chartType).classList.add("active");

		this.setState({chart: chartDisplay});
	}

	/************************************* End Line Chart *************************************/

	render() {

		return (

			<div className="stats">

				<div className="stats--tab-container">
					<button className="spendingAnalysis" onClick={() => {this.changeChart("spendingAnalysis")}}>Spending Analysis</button>
					<button className="monthlyBudget" onClick={() => {this.changeChart("monthlyBudget")}}>Monthly Budget</button>
					<button className="weekVsWeekend" onClick={() => {this.changeChart("weekVsWeekend")}}>Week vs Weekend</button>
				</div>

				{this.state.chart}

			</div>
		);

	}
}

export default Statistics;
