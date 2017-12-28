import React, { Component } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

import endOfWeek from 'date-fns/end_of_week';
import startOfWeek from 'date-fns/start_of_week';
import subWeeks from 'date-fns/sub_weeks';
import isWithinRange from 'date-fns/is_within_range';

import '../scss/statistics.scss';

class Statistics extends Component {
	constructor(props){
		super(props);

		this.state = {
			categoryDoughnutData: {},
			lineChartData: {},
			transaction_ids: new Set(),
			yearlyTransactions: [],
			lineChartBlob: [],
			lineChartLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
		}
	}

	componentDidUpdate

	componentDidMount() {
		// Doughnut Chart stuff
		this.generateDoughnutChart();
		this.generateLineChart();	
	}

	componentWillUpdate() {
		this.generateLineChart();
	}

	calculateDoughnutAmounts() {
		// Initialize a new array of size 8 and fill it with 0s initially
		let amts = new Array(8);
		amts.fill(0);

		this.props.transactions.forEach( t => {

			let category = t.category || [''];
			let amount = t.amount;

			switch (category[0]) {
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
				default:
					amts[7] += amount;
					break;
			}
		});

		amts = amts.map( val => {
			return (Math.round(val * 100) / 100).toFixed(2);
		})

		return amts;
	}

	generateDoughnutChart() {
		let amounts = this.calculateDoughnutAmounts();

		const data = {
			labels: [
				'Food and Drink',
				'Travel',
				'Shops',
				'Recreation',
				'Service',
				'Community',
				'Healthcare',
				'Other'
			],
			datasets: [{
				data: amounts,
				backgroundColor: [
					'#578CA9',
					'#F6D155',
					'#004B8D',
					'#F2552C',
					'#95DEE3',
					'#CE3175',
					'#5A7247',
					'#CFB095'
				]
			}],
			options: {
				responsive: false
			}
		};

		this.setState({ categoryDoughnutData: data} );
	}

	async generateLineChart() {

		// Line Chart stuff
		await this.getYearlyData()

		const data = {
			labels: this.state.lineChartLabels,
			datasets: [{
				data: this.state.lineChartBlob
			}],
			options: {
				responsive: false
			}
		};

		this.setState({ lineChartData: data });		
	}

	async getYearlyData() {
		
		/* Get transactions for the past 365 days */
		$.post('/plaid-api/transactions', { days: 365 }, data => {
			if (!data.transactions) {
				console.error('-----------------------------');
				throw Error('Invalid data from server');
			}

			let allTransactions = data.transactions;
						
			/* Sort the transactions by date */
			allTransactions = allTransactions.sort((a, b) => {
				return a.date - b.date;
			});

			/* Sum up costs by week */
			let amounts = new Array(52);
			amounts.fill(0);

			let mostRecentDate = allTransactions[0].date;
			let year = mostRecentDate.slice(0, 4);
			let month = mostRecentDate.slice(5, 7);
			let day = mostRecentDate.slice(8);

			// Most recent transaction's date
			let x = new Date(year, month, day);
			let i = 0;

			allTransactions.forEach(t => {
				let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7), t.date.slice(8));

				if (isWithinRange(transactionDate, startOfWeek(x), endOfWeek(x))) {
					amounts[i] += t.amount;
				} else {
					i++;
					// I've moved beyond the current range

					// Go back one week
					x = subWeeks(x, 1);

					amounts[i] += t.amount;
				}
			});

			this.setState({ lineChartBlob: amounts });

			return amounts;

		});
	}

	// async getLineChartData() {
	// 	let sortedTransactions = this.state.yearlyTransactions
	// 	// Make an array of size 52, each index represents a week and the value
	// 	// at that index the amount spent in that week
	// 	let amounts = new Array(52);
	// 	amounts.fill(0);

	// 	let mostRecentDate = sortedTransactions[0];
	// 	let year = mostRecentDate.slice(0,4);
	// 	let month = mostRecentDate.slice(5, 7);
	// 	let day = mostRecentDate.slice(8);
		
	// 	// Most recent transaction's date
	// 	let x = new Date(year, month, day);
	// 	let i = 0;

	// 	sortedTransactions.forEach(t => {
	// 		let transactionDate = new Date(t.date.slice(0,4), t.date.slice(5,7), t.date.slice(8));

	// 		if (isWithinRange(transactionDate, startOfWeek(x), endOfWeek(x) )) {
	// 			amounts[i] += t.amount;
	// 		} else {
	// 			i++;
	// 			// I've moved beyond the current range

	// 			// Go back one week
	// 			x = subWeeks(x, 1);

	// 			amounts[i] += t.amount;
	// 		}
	// 	});

	// 	return amounts;
	// }

	render() {
		return (

			<div className='stats'>

				<div className='stats--doughnut'>

					{/* Render a doughnut chart for categorical spending */}
					<Doughnut data={this.state.categoryDoughnutData} />
					<Bar data={this.state.lineChartData} />

				</div>
			</div>

		);
	}
}

export default Statistics;