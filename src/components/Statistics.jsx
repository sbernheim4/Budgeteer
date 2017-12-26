import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Statistics extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: {}
		}
	}

	componentDidMount() {
		this.generateChart();
	}

	calculateAmounts() {
		// Initialize a new array of size 14 and fill it with 0s initially
		let amts = new Array(8);
		amts.fill(0);

		this.props.transactions.forEach( t => {
			if (t.category !== null && t.amount > 0) {
				let category = t.category[0];
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
					default:
						amts[7] += amount;
						break;
				} 
			}
		});

		return amts;
	}

	generateChart() {
		let amounts = this.calculateAmounts(); 

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
			}]
		};

		this.setState( {data: data} );
	}

	render() {
		return (

			// Render a doughnut chart for categorical spending
			<Doughnut data={this.state.data} />
		);
	}
}

export default Statistics;