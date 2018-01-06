import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

import getDaysInMonth from 'date-fns/get_days_in_month';

import '../scss/budget.scss';

class Budget extends Component {
	constructor(props){
		super(props);

		this.state = {
			monthlyBudget: '',
			spentThisMonth: 0,
			
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

	componentDidMount() {
		this.getThisMonthsData();
	}

	getTotalSpent(transactions) {
		let total = 0;
		// Sum up the prices of each transaction
		transactions.forEach( transaction => {
			total += transaction.amount;
		})

		// Round total to two decimal places and ensure trailing 0s appear
		total = (Math.round(total * 100) / 100).toFixed(2);
		this.setState({ spentThisMonth: total });
	}

	getThisMonthsData() {
		// Get the total spent so far this month

		let now = new Date(); 
		let currDayOfMonth = now.getDay();
		
		// TODO: Assumes people's spending cycle begins at the beginning of each month --> Could be any date
		// Get transactions for the past currDayOfMonth days --> aka the past 
		// 18 days if today is the 18th of whatever month
		
		let options = {
			days: currDayOfMonth
		};
		
		fetch('/plaid-api/transactions', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(options)
		}).then(data => {
			return data.json();
		}).then(data => {
			this.getTotalSpent(data.transactions);
		}).catch(err => {
			console.error(err);
		});
	}

	handleChange(event) {
		// Update the state variable
		this.setState({ monthlyBudget: event.target.value.trim() });

		// Update the percentage calculator
		const spent = this.state.spentThisMonth;
		let remaining = (event.target.value - this.state.spentThisMonth).toFixed(2);
		if (remaining <= 0) {
			remaining = 0;
		}
		
		// Update the chart
		const data = {
			labels: [
				'Spent',
				'Remaining'
			],
			datasets: [{
				data: [spent, remaining],
				backgroundColor: [
					'rgb(212, 99, 99)',
					'rgb(77, 153, 114)'
				],
				hoverBackgroundColor: [
					'rgb(201, 59, 59)',
					'rgb(60, 119, 89)'
				]
			}]
		};

		this.setState({data: data})
	}

	numberWithCommas(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	render() {
		let spent = this.numberWithCommas(this.state.spentThisMonth);

		let remaining = (this.state.monthlyBudget - this.state.spentThisMonth).toFixed(2);
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


				<div className='budget--doughnut-chart'>
					<Doughnut data={this.state.data} />
				</div>

			</div>
		);
	}
}

export default Budget;
