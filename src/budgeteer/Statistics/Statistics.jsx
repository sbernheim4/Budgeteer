import React, { Component } from "react";
import isSameMonth from "date-fns/is_same_month";
import isSameYear from "date-fns/is_same_year";

import Budget from "./BudgetChart/budgetCharts.jsx";
import WeekWeekendChart from "./WeekWeekendChart/WeekWeekendChart.jsx";
import CategoryChart from "./CategoryChart/CategoryChart.jsx";
import AnnualChart from "./AnnualChart/AnnualChart.jsx";

import ScrollContainer from './ScrollContainer/ScrollContainer.jsx';

import "./statistics.scss";

class Statistics extends Component {
	constructor(props) {
		super(props);

		this.getThisMonthsTransactions = this.getThisMonthsTransactions.bind(this);

	}

	getThisMonthsTransactions() {
		const today = new Date();

		const thisMonthsTransactions = this.props.transactions.filter((transaction) => {

			const rawTransactionDate = transaction.date;
			const year = rawTransactionDate.slice(0, 4);
			const month = rawTransactionDate.slice(5,7) - 1;
			const day = rawTransactionDate.slice(8, 10);

			const normalizedTransactionDate = new Date(year, month, day);

			return isSameMonth(normalizedTransactionDate, today) && isSameYear(normalizedTransactionDate, today);

		});

		return thisMonthsTransactions;

	}

	render() {

		const elements = [];
		elements.push(
			<Budget transactions={this.getThisMonthsTransactions()} />,
			<CategoryChart transactions={this.props.transactions} />,
			<AnnualChart transactions={this.props.transactions} />,
			<WeekWeekendChart transactions={this.props.transactions} />
		);

		return (

			<div className='statistics'>

				<ScrollContainer elements={elements}/>

			</div>
		);
	}
}

export default Statistics;
