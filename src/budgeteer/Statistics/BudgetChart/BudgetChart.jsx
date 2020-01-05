import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isSameMonth, isSameYear } from 'date-fns';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import Input from './Input/input.jsx';
import BannerMessage from './../../BannerMessage/BannerMessage.jsx';

import { getMonthlyBudget, updateMonthlyBudget } from './../../redux/actions/statistics';

import { convertTransactionDate, dollarify } from '../../helpers.js';

import './budgetChart.scss';

const COLORS = ['#D46363', '#007255'];

function CustomTooltip(props) {

	const { active } = props;

	if (active) {

		const { data } = props;
		const spent = dollarify(data[0].value);
		const remaining = dollarify(data[1].value);

		return (
			<div className='chart budget--tooltip'>
				<p className='budget--tooltip--spent'>Spent: ${spent}</p>
				<p className='budget--tooltip--remaining'>Remaining: ${remaining}</p>
			</div>
		);
	}

	return null;

}

function MonthlyBudgetChart(props) {

	const [display, setDisplay] = useState(false);
	const [message, setMessage] = useState('');
	const [color, setColor] = useState('red');
	const [rechartsData, setRechartsData] = useState([
		{ name: 'Spent', value: 0 },
		{ name: 'Remaining', value: 1 }
	]);

	useEffect(() => {

		props.getMonthlyBudget();

	}, []);

	useEffect(() => {

		const totalSpent = props.transactions.reduce((acc, curr) => acc + curr.amount, 0);
		const rechartsData = updateMonthlyBudgetChart(totalSpent, props.monthlyBudget);

		setRechartsData(rechartsData);

		const remaining = rechartsData[1].value;
		const overBudget = remaining === 0;
		let timeoutId = -1;

		if (overBudget) {
			timeoutId = displayMessage('You are over budget!', 'red');
		} else {
			clearTimeout(timeoutId);
			setDisplay(false);
		}

		return () => {
			clearTimeout(timeoutId);
			setDisplay(false);
		}

	}, [props.transactions, props.monthlyBudget]);

	function updateMonthlyBudgetChart(totalSpent, newMonthlyBudget) {

		let newRemaining = newMonthlyBudget - totalSpent;

		if (newRemaining < 0) {
			newRemaining = 0;
		}

		const rechartsData = [
			{ name: 'Spent', value: totalSpent },
			{ name: 'Remaining', value: newRemaining }
		];

		return rechartsData;

	}

	function displayMessage(text, color) {

		setDisplay(true);
		setMessage(text);
		setColor(color);

		return setTimeout(() => {
			setDisplay(false);
		}, 5500);

	}

	return (
		<section className='budget'>

			<BannerMessage
				color={color}
				display={display}
				text={message}
			/>

			<h1>Monthly Budget</h1>

			<Input
				display={props.displayInput}
				updateMonthlyBudget={(e) => props.updateMonthlyBudget(e.target.value.trim())}
				monthlyBudget={props.monthlyBudget}
			/>

			<ResponsiveContainer
				className='budget--doughnut-chart'
				width='100%'
				min-height={400}
				height={400}
			>
				<PieChart>
					<Pie
						dataKey='value'
						data={rechartsData}
						innerRadius='50%'
						outerRadius='90%'
						fill='#8884d8'
						paddingAngle={0}
					>
						{rechartsData.map((_entry, index) => (
							<Cell key={index} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip content={<CustomTooltip data={rechartsData} />} />
				</PieChart>
			</ResponsiveContainer>

		</section>
	);

}

const mapStateToProps = (state) => {

	const today = new Date();
	const transactions = state.app.transactions.filter((transaction) => {
		const transactionDate = convertTransactionDate(transaction.date);
		return isSameMonth(transactionDate, today) && isSameYear(transactionDate, today) && transaction.amount > 0;
	});

	return {
		transactions,
		monthlyBudget: state.statistics.monthlyBudget
	}

}

const mapDispatchToProps = (dispatch) => {
	return {
		getMonthlyBudget: () => dispatch(getMonthlyBudget()),
		updateMonthlyBudget: (newMonthlyBudget) => dispatch(updateMonthlyBudget(newMonthlyBudget))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyBudgetChart);
