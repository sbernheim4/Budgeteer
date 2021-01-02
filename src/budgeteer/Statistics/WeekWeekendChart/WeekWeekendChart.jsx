/* eslint no-undefined: 0 */
import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks';
import isSameWeek from 'date-fns/isSameWeek';
import isWeekend from 'date-fns/isWeekend';

import { dollarify } from '../../helpers';
import './weekweekendchart.scss';

class CustomTooltip extends Component {
	render() {
		const { active } = this.props;

		if (active) {
			const { payload, label } = this.props;

			const weekdayValue = dollarify(payload[0].value);
			const weekendValue = dollarify(payload[1].value);

			return (
				<div className='week-weekend-tooltip'>
					<p className='time'>{`${label} Week(s) Ago`}</p>
					<p className='weekday-value'>{`Weekday: $${weekdayValue}`}</p>
					<p className='weekend-value'>{`Weekend: $${weekendValue}`}</p>
				</div>
			);
		}

		return null;
	}
}

class WeekWeekendChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			weekVsWeekend: [],
			transactions: []
		};
	}

	static getDerivedStateFromProps(nextProps) {
		if (nextProps.transactions.length <= 0) {
			return null;
		}

		const sortedTransactions = nextProps.transactions.sort((a, b) => {
			// a and b are transactions
			const dateA = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
			const dateB = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
			return dateA - dateB;
		});

		// TODO: Should be refactored to actually only include transactions that occur within the last 6 months --> Use .filter on the array
		const pastSixMonths = sortedTransactions.slice(nextProps.transactions.length / 2);

		// Start date is the Monday following the first transaction
		const firstDate = pastSixMonths[0].date;
		let startWeek = new Date(firstDate.slice(0, 4), firstDate.slice(5, 7) - 1, firstDate.slice(8, 10));
		startWeek = startOfWeek(startWeek, { weekStartsOn: 1 });
		let currentWeek = startWeek;

		// End week is the Sunday of the current week
		const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

		// Arrays only need to be as large as how many weeks have passed in the year so far
		// [week 1, week 2, week 3, ... week n - 1, week n] where n is the current week
		const arrSize = differenceInCalendarWeeks(endWeek, startWeek);

		const weekday = new Array(arrSize).fill(0);
		const weekend = new Array(arrSize).fill(0);

		let counter = 0;
		pastSixMonths.forEach((t) => {
			const transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			// if the transaction date is the same week as the current week
			if (isSameWeek(currentWeek, transactionDate) && t.amount > 0) {
				// determine if it goes in the weekend or weekday array
				if (isWeekend(transactionDate)) {
					weekend[counter] += t.amount;
				} else {
					weekday[counter] += t.amount;
				}
			} else if (t.amount > 0) {
				// I"ve moved to a different week so update counter index to advance as many weeks as necessary

				// NOTE: For example, transaction 1 could have been on 1/1/2018 but transaction 2 on 1/15/2018 so
				// counter would need to advance by 2 not just 1
				counter += differenceInWeeks(transactionDate, currentWeek);

				// Put the current transaction amount in the right array
				if (isWeekend(transactionDate)) {
					weekend[counter] += t.amount;
				} else {
					weekday[counter] += t.amount;
				}

				// update currentWeek to be the start of the week of the transaction date
				currentWeek = startOfWeek(transactionDate, { weekStartsOn: 1 });
			}
		});

		// Format values in the array to two decimals
		/*weekday.forEach( (val, index) => {
			if (isNaN(val)) {
				weekday[index] = 0;
			} else {
				weekday[index] = parseInt(val);
			}
		});

		weekend.forEach((val, index) => {
			if (isNaN(val)) {
				weekend[index] = 0;
			} else {
				weekend[index] = parseInt(val);
			}
		});*/

		const data = [];
		for (let i = arrSize - 1; i >= 0; i--) {
			data.push({
				name: i,
				Weekday: weekday[i],
				Weekend: weekend[i]
			});
		}

		return {
			weekVsWeekend: data
		};
	}

	render() {
		return (
			<section className='chart'>
				<h1>Week vs Weekend Spending</h1>
				<ResponsiveContainer className='week-weekend' width='100%' height={400}>
					<BarChart data={this.state.weekVsWeekend}>
						<CartesianGrid vertical={false} horizontal={true} />

						<XAxis reversed tick={{ stroke: 'black' }} />
						<YAxis tick={{ stroke: 'black' }} />

						<Tooltip content={<CustomTooltip />} />
						<Legend />

						<Bar dataKey='Weekday' stackId='a' fill='rgb(77,  153, 114)' />
						<Bar dataKey='Weekend' stackId='a' fill='rgb(52, 108, 161)' />
					</BarChart>
				</ResponsiveContainer>
			</section>
		);
	}
}

export default WeekWeekendChart;
