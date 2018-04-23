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

	}

	componentWillReceiveProps (nextProps) {

	}

	next() {
		this.reactSwipe.next();
	}

	prev() {
		this.reactSwipe.prev();
	}

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
				<ReactSwipe className='statistics' ref={reactSwipe => this.reactSwipe = reactSwipe} swipeOptions={swipeOptions}>
					<div className="item"><CategoryAndYearCharts transactions={this.props.transactions} /></div>
					<div className="item"><Budget transactions={this.props.transactions} /></div>
					<div className="item weekWeekendChart"><WeekWeekendChart transactions={this.props.transactions} /></div>
				</ReactSwipe>

				<button className="btn btn__left" type="button" onClick={this.prev}>Prev</button>
				<button className="btn btn__right" type="button" onClick={this.next}>Next</button>
			</div>
		);
	}
}

export default Statistics;
