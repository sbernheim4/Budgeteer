import React, { Component } from "react";

import { Doughnut, Line, Bar } from "react-chartjs-2";

import Budget from "./charts/Budget.jsx";
import WeekWeekendChart from "./charts/WeekWeekendChart.jsx";
import CategoryAndYearCharts from "./charts/CategoryAndYearCharts.jsx";

import helpers from './helpers';

import "./scss/statistics.scss";

Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.elements.arc.borderColor = "rgba(0, 0, 0, 0)";

class Statistics extends Component {
	constructor(props) {
		super(props);

		this.changeChart = this.changeChart.bind(this);

		this.state = {
			categoryDoughnutData: {},
			monthlyLineChartData: {},
			bubbleChartData: {},
			weekVsWeekend: {}
		}
	}

	componentDidMount() {
		this.changeChart('spendingAnalysis');
	}

	componentWillReceiveProps (nextProps) {
		this.changeChart('spendingAnalysis');
	}

	changeChart(chartType) {
		let chartDisplay;

		let tempOptions = {
			legend: {
				position: "bottom",
				display: true
			}
		}

		if (chartType === "spendingAnalysis") {
			chartDisplay = <CategoryAndYearCharts transactions={this.props.transactions} />
		} else if (chartType === "monthlyBudget") {
			chartDisplay = <Budget transactions={this.props.transactions}/>
		} else {
			chartDisplay = <WeekWeekendChart transactions={this.props.transactions}/>
		}

		document.querySelectorAll(`button`).forEach(btn => {
			btn.classList.remove("active");
		});
		document.querySelector("." + chartType).classList.add("active");

		this.setState({chart: chartDisplay});
	}

	/************************************* End Line Chart *************************************/

	render() {

		return (

			<div className="stats">

				<div className="stats--tab-container">
					<button className="spendingAnalysis" onClick={() => {this.changeChart("spendingAnalysis")}}>Spending Analysis</button>
					<button className="monthlyBudget" onClick={() => {this.changeChart("monthlyBudget")}}>Monthly Budget</button>
					<button className="weekVsWeekend" onClick={() => {this.changeChart("weekVsWeekend")}}>Week vs Weekend</button>
				</div>

				{this.state.chart}

			</div>
		);

	}
}

export default Statistics;
