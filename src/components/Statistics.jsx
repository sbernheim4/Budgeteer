import React, { Component } from 'react';
import { Doughnut, Line, Bar, Bubble, HorizontalBar } from 'react-chartjs-2';
import Budget from './Budget.jsx';

import getDay from 'date-fns/get_day';
import isWeekend from 'date-fns/is_weekend';
import isSameWeek from 'date-fns/is_same_week';
import isAfter from 'date-fns/is_after';
import differenceInDays from 'date-fns/difference_in_days'
import differenceInWeeks from 'date-fns/difference_in_weeks';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks'

import '../scss/statistics.scss';

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
		// this.generateBubbleChart();
		this.generateLineChart();
	}

	/************************************* Doughnut Chart *************************************/

	calculateDoughnutInfo() {
		// Initialize a new array of size 8 and fill it with 0s initially
		let amts = new Array(14);
		amts.fill(0);

		this.props.transactions.forEach(t => {

			let category = (t.category || [''])[0];
			let amount = t.amount;

			switch (category) {
				case 'Food and Drink':
					amts[0] += amount;
					break;
				case 'Travel':
					amts[1] += amount;
					break;
				case 'Shops':
					amts[2] += amount;
					break;
				case 'Recreation':
					amts[3] += amount;
					break;
				case 'Service':
					amts[4] += amount;
					break;
				case 'Community':
					amts[5] += amount;
					break;
				case 'Healthcare':
					amts[6] += amount;
					break;
				case 'Bank Fees':
					amts[7] += amount;
					break;
				case 'Cash Advance':
					amts[8] += amount;
					break;
				case 'Interest':
					amts[9] += amount;
					break;
				case 'Payment':
					amts[10] += amount;
					break;
				case 'Tax':
					amts[11] += amount;
					break;
				case 'Transfer':
					amts[12] += amount;
					break;
				default:
					amts[13] += amount
			}
		});

		// Normalize each value to always have two decimals
		amts = amts.map(val => {
			return (Math.round(val * 100) / 100).toFixed(2);
		});

		let labelsArray = [];
		let newAmts = [];

		let defaultLabelsArray = ['Food and Drink', 'Travel', 'Shops', 'Recreation', 'Service', 'Community', 'Healthcare', 'Bank Fees', 'Cash Advance', 'Interest', 'Payment', 'Tax', 'Transfer', 'Other'];

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
				backgroundColor: ['#578CA9', '#F6D155', '#004B8D', '#F2552C', '#95DEE3', '#CE3175', '#5A7247', '#CFB095', '#578CA9', '#f4d942', '#afc47d', '#558244', '#347759', '#2d7582']
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
		avg = (Math.round(avg * 100) / 100).toFixed(2);

		// Round the amounts to two decimals
		amounts = amounts.map(val => {
			return (Math.round(val * 100) / 100).toFixed(2);
		});

		const lineData = {
			labels: ['Jan.', 'Feb.', 'Mar.', 'Apirl', 'May', 'June', 'July', 'Aug. ', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
			datasets: [{
				type: 'line',
				data: new Array(12).fill(avg),
				label: 'Avg. Monthly Spending',
				radius: 0,
				borderColor: '#EC932F',
				backgroundColor: '#EC932F',
				pointBorderColor: '#EC932F',
				pointBackgroundColor: '#EC932F',
				pointHoverBackgroundColor: '#EC932F',
				pointHoverBorderColor: '#EC932F',
				fill: false
			},
			{
				type: 'bar',
				data: amounts,
				label: 'Monthly Spending',
				backgroundColor: 'rgb(77, 153, 114)',
				borderColor: 'rgb(77, 153, 114)',
				hoverBorderColor: 'rgb(77, 153, 114)',
				hoverBackgroundColor: 'rgb(60, 119, 89)'
			}],
			options: {
				responsive: false,
			}
		};

		this.setState({ monthlyLineChartData: lineData });
	}

	/************************************* End Bar Chart *************************************/


	/************************************* Line Chart *************************************/

	generateLineChart() {

		// Sort the transactions from oldest to newest --> [oldest, ..., newest]
		this.props.transactions.sort((a, b) => {
			// a and b are transactions
			let dateA = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			let dateB = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return isAfter(dateA, dateB);
		});

		let firstDate = this.props.transactions[0].date;
		let currentWeek = new Date(firstDate.slice(0, 4), firstDate.slice(5, 7) - 1, firstDate.slice(8, 10));
		let beginningOfYear = new Date(currentWeek.getFullYear(), 0, 1);
		let counter = differenceInWeeks(currentWeek, beginningOfYear);

		// Arrays only need to be as large as how many weeks have passed in the year so far
		// [week 1, week 2, week 3, ... week n - 1, week n] where n is the current week
		let arrSize = differenceInCalendarWeeks(new Date(), beginningOfYear);
		let weekday = new Array(arrSize).fill(0);
		let weekend = new Array(arrSize).fill(0);

		this.props.transactions.forEach(t => {
			let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			if (isSameWeek(currentWeek, transactionDate) && t.amount > 0) {
				debugger;
				if (isWeekend(transactionDate)) {
					weekend[counter] += t.amount;
				} else {
					weekday[counter] += t.amount;
				}
			} else if (t.amount > 0) {
				debugger;
				// I've moved to a different week so update counter index
				counter += differenceInWeeks(transactionDate, currentWeek);

				// Put the current transaction amount in the right array
				if (isWeekend(transactionDate)) {
					weekend[counter] += t.amount;
				} else {
					weekday[counter] += t.amount;
				}

				// update currentWeek
				currentWeek = transactionDate;
			}
		});

		const chartData = {
			labels: this.generateLineChartLabels(arrSize),
			label: 'Week vs Weekend Spending for the past 52 Weeks',
			datasets:  [
				{
					data:  weekday,
					fill:  false,
					label:  'Weekday',
					backgroundColor:  "rgb( 77,  153, 114)",
					borderColor: "rgb(77, 153, 114)",
				},
				{
					data: weekend,
					fill: false,
					label: 'Weekend',
					backgroundColor: "rgb(52, 108, 161)",
					borderColor: "rgb(52, 108, 161)",
				}
			],
			options: {
				responsive: false
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

			<div className='stats'>

				<Budget transactions={this.props.transactions}/>

				<div className='stats--doughnut'>
					{/* Render a doughnut chart for categorical spending */}
					<Doughnut data={this.state.categoryDoughnutData} />
				</div>

				<div className='stats--line-chart'>
					{/* Render a bar and line chart for monthly and avg spending */}
					<Bar data={this.state.monthlyLineChartData} />
				</div>

				<div className='stats--bubble-chart'>
					{/* Render a bar and line chart for monthly and avg spending */}
					{/* <Bubble data={this.state.bubbleChartData} /> */}
				</div>

				<div className='stats--week-weekend'>
					<Line data={this.state.weekVsWeekend} />
				</div>
			</div>

		);
	}

	/************************************* Bubble Chart *************************************/

	generateBubbleChart() {
		let bubbleDataPoints = [];

		let dayConverter = ['Mon', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.', 'Sun'];
		let monthConverter = ['Jan.', 'Feb.', 'Mar.', 'Apirl', 'May', 'June', 'July', 'Aug. ', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

		this.props.transactions.forEach(t => {
			if (t.amount > 0) {
				let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7), t.date.slice(8, 10));

				// Day of Week
				let dayOfWeek = getDay(transactionDate); // 1 - 7
				// dayOfWeek = dayConverter[dayOfWeek]; // Mon., Tues., Wed., etc

				// Month Name
				let month = t.date.slice(5, 7); // 1 - 12
				// month = monthConverter[month];

				// find a better scaling factor than Math.log
				let newPoint = { x: dayOfWeek, y: month, r: t.amount / 20 };

				bubbleDataPoints.push(newPoint);
			}
		});

		// X ranges from 0 to 6 for the weekday,
		// Y ranges from 0:00 to 23:59 based on the time
		// Z is the amount of the transaction
		const data = {
			datasets: [
				{
					backgroundColor: "rgba(0, 0, 0, .5)",
					data: bubbleDataPoints,
					label: 'Spending by Week, Month, and Size',
				}
			],
			options: {
				responsive: false
			}
		};

		this.setState({ bubbleChartData: data });
	}

	/************************************* End Bubble Chart *************************************/
}

export default Statistics;
