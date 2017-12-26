import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

import '../scss/budget.scss';

class Budget extends Component {
	constructor(props){
		super(props);
		this.state = {
			monthlyBudget: '',
			data: {
				labels: [
					'Spent',
					'Remaining'
				],
				datasets: [{
					data: [0, 1],
					backgroundColor: [
						'rgb(212,99,99)',
						'rgb(77, 153, 114)'
					],
					hoverBackgroundColor: [
						'#D46363',
						'#007255'
					]
				}]
			}
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		// Update the state variable
		this.setState({ monthlyBudget: event.target.value.trim() });

		// // Update the percentage calculator
		// const graph = document.querySelector('.budget--graph > div');
		// let percentage = (this.props.totalSpent / event.target.value) * 100;
		// graph.style.width = percentage + "%";

		const spent = this.props.totalSpent;
		let remaining = (event.target.value - this.props.totalSpent).toFixed(2);
		if (remaining <= 0) {
			remaining = 0;
		}

		const data = {
			labels: [
				'Spent',
				'Remaining'
			],
			datasets: [{
				data: [spent, remaining],
				backgroundColor: [
					'rgb(212,99,99)',
					'rgb(77, 153, 114)'
				],
				hoverBackgroundColor: [
					'#D46363',
					'#007255'
				]
			}]
		};

		this.setState({data: data})

		// Update the pie chart
		// this.generateChart(spent, remaining);
	}

	numberWithCommas(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	render() {
		let spent = this.numberWithCommas(this.props.totalSpent);

		let remaining = (this.state.monthlyBudget - this.props.totalSpent).toFixed(2);
		remaining = this.numberWithCommas(remaining);

		return (
			<div className='budget'>

				<div className='budget--totals'>
					<h2>Spent: ${spent}</h2>
					<h2>Remaining: ${remaining}</h2>
				</div>

				<form className='budget--form'>
					<label>
						<span>Monthly Budget</span>
						<input placeholder='Enter your budget' type='text' name='budget' value={this.state.monthlyBudget} onChange={this.handleChange} />
					</label>
				</form>


				{/* <p className='budget--percent'>{((this.props.totalSpent / this.state.monthlyBudget)*100).toFixed(2) || 0}% spent</p> */}

				<div className='budget--doughnut-chart'>
					<Doughnut data={this.state.data} />
				</div>

			</div>
		);
	}
}

export default Budget;
