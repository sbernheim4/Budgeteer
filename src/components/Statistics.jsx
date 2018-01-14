import React, { Component } from "react";

import { Doughnut, Line, Bar } from "react-chartjs-2";
import Budget from "./Budget.jsx";

import isWeekend from "date-fns/is_weekend";
import isSameWeek from "date-fns/is_same_week";
import differenceInCalendarWeeks from "date-fns/difference_in_calendar_weeks";
import isSameMonth from "date-fns/is_same_month";
import startOfWeek from "date-fns/start_of_week";
import addWeeks from "date-fns/add_weeks";
import subWeeks from "date-fns/sub_weeks";
import isBefore from 'date-fns/is_before';
import isAfter from "date-fns/is_after";

import helpers from './helpers';

import "../scss/statistics.scss";

class Statistics extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryDoughnutData: {},
			monthlyLineChartData: {},
			bubbleChartData: {},
            weekVsWeekend: {}
		}
	}

	componentDidMount() {
		// Generate all the charts when the component has loaded

		this.generateDoughnutChart();
		this.generateMonthlyBarChart();
        this.generateLineChart();
	}

	/************************************* Doughnut Chart *************************************/

	calculateDoughnutInfo() {
		// Initialize a new array of size 8 and fill it with 0s initially
		let amts = new Array(14);
		amts.fill(0);

		this.props.transactions.forEach(t => {
            let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

            if (isSameMonth(transactionDate, new Date)) {
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
				responsive: false
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

        let monthsDefault = ["Jan.", "Feb.", "Mar.", "Apirl", "May", "June", "July", "Aug. ", "Sept.", "Oct.", "Nov.", "Dec."];
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
				borderColor: "rgb(77, 153, 114)",
				hoverBorderColor: "rgb(77, 153, 114)",
				hoverBackgroundColor: "rgb(60, 119, 89)"
			}],
			options: {
				responsive: false,
			}
		};

		this.setState({ monthlyLineChartData: lineData });
	}

	/************************************* End Bar Chart *************************************/


	/************************************* Line Chart *************************************/


    // TODO: MATH NEEDS TO BE REDONE SINCE I AM NOW GOING AS FAR BACK AS ONE YEAR
	generateLineChart() {

		// Sort the transactions from oldest to newest --> [oldest, ..., newest]
		let pastSixMonths = this.props.transactions.sort((a, b) => {
			// a and b are transactions
			let dateA = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateB = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateA - dateB;
        });
        // Only really care about the past 6 months, not a full year
        pastSixMonths = pastSixMonths.slice(this.props.transactions.length / 2);

        // Start date is the Monday following the first transaction
        let firstDate = pastSixMonths[0].date;
        let startWeek = new Date(firstDate.slice(0, 4), firstDate.slice(5, 7) - 1, firstDate.slice(8, 10));
        // startWeek = addWeeks(startWeek, 1);
        startWeek = startOfWeek(startWeek, { weekStartsOn: 1 });

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

        pastSixMonths.forEach(t => {
            let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

            if (isBefore(transactionDate, endWeek)) {
                if (isSameWeek(startWeek, transactionDate) && t.amount > 0) {
                    if (isWeekend(transactionDate)) {
                        weekend[counter] += t.amount;
                    } else {
                        weekday[counter] += t.amount;
                    }
                } else if (t.amount > 0) {
                    // I"ve moved to a different week so update counter index
                    counter += differenceInCalendarWeeks(transactionDate, startWeek);


                    // Put the current transaction amount in the right array
                    if (isWeekend(transactionDate)) {
                        weekend[counter] += t.amount;
                    } else {
                        weekday[counter] += t.amount;
                    }

                    // update currentWeek
                    startWeek = transactionDate;
                }
            }
		});

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
                    borderColor: "rgb(77, 153, 114)",
				},
				{
                    stack: "Stack 0",
					data: weekend,
					fill: false,
					label: "Weekend",
					backgroundColor: "rgb(52, 108, 161)",
                    borderColor: "rgb(52, 108, 161)",
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

		this.setState({ weekVsWeekend: chartData });
	}

	generateLineChartLabels(length) {
		let arr = [];
		for (let i = length; i > 0; i--) {
			arr.push(i);
		}

		return arr;
	}

    /************************************* End Line Chart *************************************/


	render() {
		return (

			<div className="stats">

				<Budget transactions={this.props.transactions}/>

				<div className="stats--doughnut">
					{/* Render a doughnut chart for categorical spending */}
					<Doughnut data={this.state.categoryDoughnutData} />
				</div>

				<div className="stats--line-chart">
					{/* Render a bar and line chart for monthly and avg spending */}
					<Bar data={this.state.monthlyLineChartData} />
				</div>

				<div className="stats--week-weekend">
					<Bar data={this.state.weekVsWeekend} />
				</div>

			</div>

		);
    }
}

export default Statistics;
