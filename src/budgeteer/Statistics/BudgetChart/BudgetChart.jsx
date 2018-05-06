import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Legend, Label, Tooltip, text, tspan} from "recharts"

import helpers from "../../helpers.js";

import differenceInDays from "date-fns/difference_in_days";
import isSameMonth from "date-fns/is_same_month";
import isSameYear from "date-fns/is_same_year";

import "./budgetChart.scss";

const COLORS = [
	"#D46363",
	"#007255",
];

class CustomTooltip extends Component {

	render() {
		const { active } = this.props;

		if (active) {
			return (

				<div className="budget--tooltip">
					<p className="budget--tooltip--spent" >Spent: ${this.props.spent}</p>
					<p className="budget--tooltip--remaining">Remaining: ${this.props.remaining}</p>
				</div>
			);
		}

		return null;
	}
};

class BudgetChart extends Component {
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

	static getDerivedStateFromProps(nextProps, prevState) {

		if (nextProps.transactions.length > 0) {
			let totalSpent = 0;
			let today = new Date();

			// Calculate total spent this month
			for (let t of nextProps.transactions) {
				const transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

				if (isSameMonth(transactionDate, today) && isSameYear(transactionDate, today)) {
					totalSpent += t.amount;
				}
			}


			// Retrieve monthly budget from session storage
			const monthlyBudgetFromSessionStorage = localStorage.getItem("monthlyBudget"); // Get monthly budget from session storage

			// Calculate remaining amount left to spend
			let remaining = (monthlyBudgetFromSessionStorage - totalSpent) <= 0 ? 0 : (monthlyBudgetFromSessionStorage - totalSpent);

			// Create chart data set
			const chartData = [
				{name: 'Spent', value: totalSpent},
				{name: 'Remaining', value: remaining},
			];

			// Set the state
			return {
				spentThisMonth: totalSpent,
				rechartsData: chartData,
				monthlyBudget: monthlyBudgetFromSessionStorage
			};

		} else {
			return null;
		}
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
						<Tooltip content={<CustomTooltip remaining={remaining} spent={spent}/>}/>

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

export default BudgetChart;
