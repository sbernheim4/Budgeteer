import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

import { getSavingsChartData } from './../../redux/actions/savings';

import { dollarify, formatAmount } from './../../helpers';

import './savingsChart.scss';

function SavingsChart(props) {

	const [minMax, setMinMax] = useState({min: 0, max: 10});
	const [chartColor] = useState('#79c6a3');

	const rechartsData = useSelector(state => state.savings[props.institutionId]) || [];

	// const bankInfo = useSelector(
	// 	state => state.savings.bankInfo.find(institution => institution.institutionId === props.institutionId)
	// );

	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(getSavingsChartData(props.institutionId));

	}, [props.institutionId]);

	useEffect(() => {

		const bounds = getChartBounds(rechartsData);

		if (minMax !== bounds) {
			setMinMax(bounds);
		}

		determineChartColor(rechartsData);

	}, [rechartsData])

	function getChartBounds(data) {

		if (!rechartsData.length) {
			return minMax;
		}

		const multiplier = .03;
		const normalizer = 100;

		const balances = data.map(dataPoint => dataPoint.balance);

		const min = Math.min(...balances);
		const max = Math.max(...balances);

		const paddedMin = parseFloat(formatAmount((1 - multiplier) * min));
		const paddedMax = (normalizer - (max % normalizer)) + max

		// Display multiples of 100 on the y axis
		const normalizedMin = paddedMin + (normalizer - (paddedMin % normalizer));
		const normalizedMax = paddedMax + (normalizer - (paddedMax % normalizer));

		return {
			min: normalizedMin,
			max: normalizedMax
		}

	}

	function determineChartColor(chartData) {

		const positiveValues = chartData
			.map(dataPoint => dataPoint.balance)
			.filter(balance => balance >= 0);

		if (positiveValues.length === 0) {
			// TODO: This is currently always true and red is used for all charts
			//setChartColor('#c67d79');
		}

	}

	function determineInterval() {

		const { length } = rechartsData;

		if (length <= 4) {
			return 1;
		} else if (length > 4 && length <= 6) {
			return 2;
		} else if (length > 6 && length <= 10) {
			return 3;
		} else if (/Mobi|Android/i.test(navigator.userAgent)) {
			return Math.floor(length / 3);
		} else {
			return Math.floor(length / 5);
		}

	}

	if (!props.displayChart) {
		return null;
	}

	return (
		<section className='savings-chart'>
			<ResponsiveContainer
				width='100%'
				height='100%'
			>
				<AreaChart
					data={rechartsData}
					margin={{ top: 20, right: 35, left: 35, bottom: 10 }}
				>
					<YAxis
						hide={true}
						domain={[
							minMax.min,
							minMax.max
						]}
					/>

					<XAxis
						interval={determineInterval()}
						dataKey='name'
					/>

					<Tooltip
						content={CustomToolTip}
					/>

					<Area
						type='monotone'
						dataKey='balance'
						stroke={chartColor}
						fill={chartColor}
						isAnimationActive={false}
						strokeWidth={4}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</section>
	);
}

function CustomToolTip(props) {
	if (!(props.active && props.payload)) {

		return null
	}

	const { payload, label } = props;

	const balance = payload[0].value;
	const displayableBalance = `$${dollarify(balance)}`;
	const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

	const date = label.split('/');
	const [month, day, year] = date;
	const writtenMonth = months[month - 1];

	return (
		<div className="savings-chart-tooltip">
		<p>{writtenMonth}. {day} {year}</p>
		<p>{displayableBalance}</p>
		</div>
	);

}

export default SavingsChart;
