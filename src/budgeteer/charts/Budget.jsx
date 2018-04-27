import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Legend, Label, Tooltip, text, tspan} from "recharts"

import helpers from "../helpers.js";

import differenceInDays from "date-fns/difference_in_days";
import isSameMonth from "date-fns/is_same_month";
import isSameYear from "date-fns/is_same_year";

import "../scss/budget.scss";

const COLORS = [
	"#D46363",
	"#007255",
];

class CustomTooltip extends Component {

	render() {
		const { active } = this.props;

		if (active) {
			const { payload, label } = this.props;

			let value = helpers.formatAmount(payload[0].value);
			value = helpers.numberWithCommas(value);

			let valueTwo = helpers.formatAmount(payload[1].value);
			valueTwo = helpers.numberWithCommas(valueTwo);


			return (
				<div className="custom-tooltip">
					<p className="label">{`${payload[0].name}:\n $${value}`}</p>
					<p className="label">{`${payload[1].name}:\n $${valueTwo}`}</p>
				</div>
			);
		}

		return null;
	}
};

class Budget extends Component {
	constructor(props){
		super(props);

		this.state = {
			monthlyBudget: "",
			spentThisMonth: 0,
			rechartsData: [
				{name: 'Spent', value: 0},
				{name: 'Remaining', value: 1}
			]
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const totalSpent = this.getTotalSpent(); // Get total spent this month
		const monthlyBudgetFromSessionStorage = localStorage.getItem("monthlyBudget"); // Get monthly budget from session storage


		// Calculate remaining amount left to spend
		let remaining = (monthlyBudgetFromSessionStorage - totalSpent) <= 0 ? 0 : (monthlyBudgetFromSessionStorage - totalSpent);

		// Update chart
		if (monthlyBudgetFromSessionStorage !== null) {
			const chartData = [
				{name: 'Spent', value: totalSpent},
				{name: 'Remaining', value: remaining},
			];


			this.setState({
				rechartsData: chartData,
				monthlyBudget: monthlyBudgetFromSessionStorage
			});
		}
	}

	getTotalSpent() {
		let total = 0;

		let today = new Date();

		// Sum up the prices of each transaction
		this.props.transactions.forEach(t => {
			let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			if (isSameMonth(transactionDate, today) && isSameYear(transactionDate, today)) {
				total += t.amount;
			}
		})

		this.setState({ spentThisMonth: total });
		return total;
	}

	handleChange(event) {
		// Update the state variable
		this.setState({ monthlyBudget: event.target.value.trim() });

		// Save data to the current local store
		localStorage.setItem("monthlyBudget", event.target.value.trim());

		// Update the percentage calculator
		const spent = this.state.spentThisMonth;
		const remaining = (event.target.value - this.state.spentThisMonth) <= 0 ? 0 : (event.target.value - this.state.spentThisMonth);

		// Update the chart
		let amts = [
			{name: 'Spent', value: spent},
			{name: 'Remaining', value: remaining},
		];

		this.setState({
			rechartsData: amts
		})
	}

	render() {
		let spent = helpers.formatAmount(this.state.spentThisMonth)
		spent = helpers.numberWithCommas(spent);

		let remaining = (this.state.monthlyBudget - this.state.spentThisMonth);
		remaining = helpers.formatAmount(remaining);
		remaining = helpers.numberWithCommas(remaining);

		return (
			<div className="budget">

				{/*<Doughnut className="budget--doughnut-chart" data={this.state.data} />*/}
				<ResponsiveContainer className="budget--doughnut-chart" width="100%" min-height={400} height={400} >
					<PieChart>
						<Pie
							data={this.state.rechartsData}
							innerRadius="50%"
							outerRadius="90%"
							fill="#8884d8"
							paddingAngle={0}>

							{
								this.state.rechartsData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
							}
							{/*<Label className="center-label" fill={"white"} value={this.state.totalSpent} position="center" />*/}
						</Pie>
						<Tooltip content={<CustomTooltip/>}/>

					</PieChart>
				</ResponsiveContainer>


				<form className="budget--form">
					<label>
						<span>Monthly Budget</span>
						<input placeholder="Enter your budget" type="number" name="budget" value={this.state.monthlyBudget} onChange={this.handleChange} />
					</label>
				</form>
			</div>
		);
	}
}

export default Budget;
