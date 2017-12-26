import React, { Component } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

import '../scss/statistics.scss';

class Statistics extends Component {
	constructor(props){
		super(props);
		this.state = {
			categoryDoughnutData: {},
			totalLineData: {}
		}
	}

	componentDidMount() {
		this.generateDoughnutChart();
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

	generateLineChart() {

		// Get the past year's worth of data

		// Sum up total spending amounts for each week 
		// Dynamically create labels array
		// Dynamically create data array


		// Sort the transactions based on date
		let sortedTransactions = this.props.transactions.sort( (a, b) => {
			return a.date - b.date;
		});

		sortedTransactions.reverse();
	}

	render() {
		return (

			<div className='stats'>

				<div className='stats--doughnut'>

					{/* Render a doughnut chart for categorical spending */}
					<Doughnut data={this.state.categoryDoughnutData} />
					{/* <Bar data={this.state.categoryDoughnutData} /> */}

				</div>
			</div>

		);
	}
}

export default Statistics;