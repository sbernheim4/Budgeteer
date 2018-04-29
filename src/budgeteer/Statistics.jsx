import React, { Component } from "react";
import ReactSwipe from 'react-swipe';

import { Doughnut, Line, Bar } from "react-chartjs-2";

import Budget from "./charts/Budget.jsx";
import WeekWeekendChart from "./charts/WeekWeekendChart.jsx";
import CategoryChart from "./charts/CategoryChart.jsx";
import Year from "./charts/Year.jsx";

import isSameMonth from 'date-fns/is_same_month';

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
		}
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
			auto: 0,
			speed: 300,
			disableScroll: true,
			continuous: true,
			callback() {

			},
			transitionEnd() {

			}
		};

		return (

			<div className='statistics'>

				<ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} swipeOptions={swipeOptions}>
					<div className="item category-chart-container"><CategoryChart transactions={this.props.transactions} /></div>
					<div className="item"><WeekWeekendChart transactions={this.props.transactions} /></div>
					<div className="item"><Year transactions={this.props.transactions} /></div>
					<div className="item"><Budget transactions={this.props.transactions} /></div>
					<div className="item"><WeekWeekendChart transactions={this.props.transactions} /></div>
				</ReactSwipe>

				<button className="btn btn__left" type="button" onClick={this.prev}>Prev</button>
				<button className="btn btn__right" type="button" onClick={this.next}>Next</button>
			</div>
		);
	}
}

export default Statistics;
