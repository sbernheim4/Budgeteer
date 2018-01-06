import React, { Component } from 'react';
import { Doughnut, Line, Bar, Bubble } from 'react-chartjs-2';

import getDay from 'date-fns/get_day';

import '../scss/statistics.scss';

class Statistics extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categoryDoughnutData: {},
			lineChartData: {},
			bubbleChartData: {}
		}
	}

	componentDidMount() {
		// Doughnut Chart stuff
		this.generateDoughnutChart();
		this.generateLineChart();
		this.generateBubbleChart();
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



	/************************************* Line Chart *************************************/

	generateLineChart() {
		/* Sum up costs by week */
		let amounts = new Array(12);
		amounts.fill(0);

		/* Get transactions for the past 365 days */
		$.post('/plaid-api/transactions', { days: 365 }, data => {
			if (!data.transactions) {
				console.error('-----------------------------');
				throw Error('Invalid data from server');
			}

			let avg = 0;
			data.transactions.forEach(t => {

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
				labels: ['Jan.', 'Feb.', 'Mar.', 'Apirl', 'May', 'June', 'July', 'Aug. ', 'Sept.', 'Oct.', 'Nov.', 'Dec.'], //13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
				datasets: [
					{
					type: 'line',
					data: new Array(12).fill(avg),
					label: 'Average Spending',
					borderColor: '#EC932F',
					backgroundColor: '#EC932F',
					pointBorderColor: '#EC932F',
					pointBackgroundColor: '#EC932F',
					pointHoverBackgroundColor: '#EC932F',
					pointHoverBorderColor: '#EC932F',
					fill: false,
				},
				{
					type: 'bar',
					data: amounts,
					label: 'Monthly Spending',
					backgroundColor: '#71B37C',
					backgroundColor: '#71B37C',
					borderColor: '#71B37C',
					hoverBackgroundColor: '#71B37C',
					hoverBorderColor: '#71B37C',
				}
			],
				options: {
					responsive: false
				}
			};

			this.setState({ lineChartData: lineData });
		});
	}

	/************************************* End Line Chart *************************************/



	/************************************* Bubble Chart *************************************/

	generateBubbleChart() {
		let bubbleDataPoints = [];

		this.props.transactions.forEach(t => {
			if (t.amount > 0){
				let transactionDate = new Date(t.date.slice(0,4), t.date.slice(5, 7), t.date.slice(8, 10));
				let dayOfWeek = getDay(transactionDate);
	
				// find a better scaling factor than Math.log
				let newPoint = { x: dayOfWeek, y: 12, r: t.amount/20};
	
				bubbleDataPoints.push(newPoint);
			}
		});

		// "2017-12-06"

		// X ranges from 0 to 6 for the weekday, 
		// Y ranges from 0:00 to 23:59 based on the time
		// Z is the amount of the transaction 
		const data = {
			datasets: [
				{
					backgroundColor: "rgb(0, 0, 0)",
					data: bubbleDataPoints
				}
			],
			options: {
				responsive: false
			}
		};

		this.setState({ bubbleChartData: data });
	}

	/************************************* End Bubble Chart *************************************/

	render() {
		return (

			<div className='stats'>

				<div className='stats--doughnut'>
					{/* Render a doughnut chart for categorical spending */}
					<Doughnut data={this.state.categoryDoughnutData} />
				</div>

				<div className='stats--line-chart'>
					{/* Render a bar and line chart for monthly and avg spending */}
					<Bar data={this.state.lineChartData} />
				</div>

				<div className='stats--bubble-chart'>
					{/* Render a bar and line chart for monthly and avg spending */}
					<Bubble data={this.state.bubbleChartData} />
				</div>
			</div>

		);
	}
}

export default Statistics;
