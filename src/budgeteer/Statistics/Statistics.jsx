import React, { Component } from "react";
import ReactSwipe from 'react-swipe';

import { Doughnut, Line, Bar } from "react-chartjs-2";

import Budget from "./BudgetChart/BudgetChart.jsx";
import WeekWeekendChart from "./WeekWeekendChart/WeekWeekendChart.jsx";
import CategoryChart from "./CategoryChart/CategoryChart.jsx";
import AnnualChart from "./AnnualChart/AnnualChart.jsx";

import isSameMonth from 'date-fns/is_same_month';

import helpers from '../helpers';

import "./statistics.scss";

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
					<div className="item category-chart-container">
						<h1>Categorical Spending</h1>
						<CategoryChart transactions={this.props.transactions} />
					</div>

					<div className="item">
						<h1>Annual Spending History</h1>
						<Year transactions={this.props.transactions} />
					</div>

					<div className="item">
						<h1>Monthly Budget</h1>
						<Budget transactions={this.props.transactions} />
					</div>

					<div className="item">
						<h1>Week VS Weekend Spending</h1>
						<WeekWeekendChart transactions={this.props.transactions} />
					</div>
				</ReactSwipe>

				<button className="btn btn__left" type="button" onClick={this.prev}>Prev</button>
				<button className="btn btn__right" type="button" onClick={this.next}>Next</button>
			</div>
		);
	}
}

export default Statistics;
