import React, { Component } from "react";
import ReactSwipe from 'react-swipe';

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

		// this.changeChart = this.changeChart.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);

		this.state = {
			categoryDoughnutData: {},
			monthlyLineChartData: {},
			bubbleChartData: {},
			weekVsWeekend: {}
		}
	}

	componentDidUpdate(prevProps, prevState) {
    	// due to buggy iframe behavior
		window.dispatchEvent(new Event('resize'));
	}

	componentDidMount() {
		// this.changeChart('spendingAnalysis');
	}

	componentWillReceiveProps (nextProps) {
		// this.changeChart('spendingAnalysis');
	}

	// changeChart(chartType) {
	// 	let chartDisplay;

	// 	let tempOptions = {
	// 		legend: {
	// 			position: "bottom",
	// 			display: true
	// 		}
	// 	}

	// 	if (chartType === "spendingAnalysis") {
	// 		chartDisplay = <CategoryAndYearCharts transactions={this.props.transactions} />
	// 	} else if (chartType === "monthlyBudget") {
	// 		chartDisplay = <Budget transactions={this.props.transactions}/>
	// 	} else {
	// 		chartDisplay = <WeekWeekendChart transactions={this.props.transactions}/>
	// 	}

	// 	document.querySelectorAll(`button`).forEach(btn => {
	// 		btn.classList.remove("active");
	// 	});
	// 	document.querySelector("." + chartType).classList.add("active");

	// 	this.setState({chart: chartDisplay});
	// }

	next() {
		this.reactSwipe.next();
	}

	prev() {
		this.reactSwipe.prev();
	}


	/************************************* End Line Chart *************************************/

	render() {

		const swipeOptions = {
			startSlide: 0,
			auto:  0,
			speed: 300,
			disableScroll: true,
			continuous: true,
			callback() {

			},
			transitionEnd() {

			}
		};

		return (

			<div>
	          <button type="button" onClick={this.prev}>Prev</button>
	          <button type="button" onClick={this.next}>Next</button>

				<ReactSwipe className='statistics' ref={reactSwipe => this.reactSwipe = reactSwipe} swipeOptions={swipeOptions}>
					<div className="item"><CategoryAndYearCharts transactions={this.props.transactions} /></div>
					<div className="item"><Budget transactions={this.props.transactions} /></div>
					<div className="item"><WeekWeekendChart transactions={this.props.transactions} /></div>
				</ReactSwipe>


			</div>
		);
	}
}

export default Statistics;
