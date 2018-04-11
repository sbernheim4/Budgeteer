import React, { Component } from "react";
import { Doughnut, Bar } from "react-chartjs-2";


import subMonths from 'date-fns/sub_months';
import isWithinRange from 'date-fns/is_within_range';

import helpers from '../helpers';

class CategoryAndYearCharts extends Component {

	constructor(props) {
		super(props);

		this.state = {
			categoryDoughnutData: {},
			monthlyLineChartData: {},
		}
	}

	componentDidMount() {
		this.generateDoughnutChart();
		this.generateMonthlyBarChart();
	}

	componentWillReceiveProps() {
		this.generateDoughnutChart();
		this.generateMonthlyBarChart();
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

		this.setState({
			categoryDoughnutData: data
		});
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

		this.setState({ monthlyLineChartData: lineData });
	}

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
			},
		}

		let tempOptions = {
			legend: {
				position: "bottom",
				display: true
			}
		}

		return (
			<div className="stats--spending">
				<div className="stats--spending--doughnut">
					<Doughnut options={tempOptions} data={this.state.categoryDoughnutData} />
				</div>

				<hr />

				<div className="stats--spending--line-chart">
					<Bar options={barOptions} data={this.state.monthlyLineChartData} />
				</div>
			</div>

		)
	}
}

export default CategoryAndYearCharts;
