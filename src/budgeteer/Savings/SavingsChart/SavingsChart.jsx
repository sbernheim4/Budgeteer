import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import { getSavingsChartData } from './../../redux/actions/savings';

import { dollarify, formatAmount } from './../../helpers';

import './savingsChart.scss';
import { subYears } from 'date-fns/fp';
import {isAfter, isBefore, isWithinInterval} from 'date-fns';

function SavingsChart(props) {

    const today = new Date();
    const minusOneYear = subYears(1);
    const oneYearAgo = minusOneYear(today);

	const [displayableChartData, setDisplayableChartData] = useState([]);
    const [startDate, setStartDate] = useState(oneYearAgo);
    const [endDate, setEndDate] = useState(today);
	const [minMax, setMinMax] = useState({min: 0, max: 10});
	const [chartColor, setChartColor] = useState('#79c6a3');

	const dispatch = useDispatch();

	useEffect(() => {

		const interval = {
			start: startDate,
			end: endDate
		};

		const updatedDataToDisplay = props.rechartsData.filter(curr => {
			return isWithinInterval(curr.date, interval)
		});

		setDisplayableChartData(updatedDataToDisplay);

	}, [startDate, endDate])

	useEffect(() => {

		dispatch(getSavingsChartData(props.institutionId));

	}, [props.institutionId]);

	useEffect(() => {

		const bounds = getChartRange(props.rechartsData);

		setMinMax(bounds);
		determineChartColor(props.rechartsData);
		setDisplayableChartData(props.rechartsData)

	}, [props.rechartsData])

	function getChartRange(data) {

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

	// This is the function handler when changing the bounds of the chart
	function getChartDomain(e) {
		console.log('e:', e);

		//	const newValue = e.target.value; // NOTE: This must be a date string or convertible to a date object
		//	const updatedDateValue = new Date(newValue);
		//	const type = e.target.dataset['type']; // include in controls date-type='FROM' or data-type='TO';
		//
		//	if (type === 'FROM') {
		//
		//		if (isBefore(updatedDateValue, endDate)) {
		//			setStartDate(updatedDateValue);
		//		} else {
		//			setStartDate(endDate);
		//			setEndDate(updatedDateValue);
		//		}
		//
		//	} else if (type = 'TO') {
		//
		//		if (isAfter(updatedDateValue, endDate)) {
		//			setEndDate(updatedDateValue);
		//		} else {
		//			setEndDate(startDate);
		//			setStartDate(updatedDateValue);
		//		}
		//
		//	}
		//

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

		const { length } = props.rechartsData;

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

	return (
		<section className='savings-chart'>
			<ResponsiveContainer
				width='100%'
				height='100%'
			>
				<AreaChart
					data={displayableChartData}
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
						strokeWidth={4}
					/>
				</AreaChart>
			</ResponsiveContainer>

				{ /* TODO: Use a react component from npm here that supports dual input*/ }
			<input
				draggable="true"
				onChange={getChartDomain}
				type='range'
				min='1'
				max={displayableChartData.length}
			/>
		</section>
	);
}

const mapStateToProps = (state, ownProps) => {

	const institutionInfo = state.savings.bankInfo.find(institution => {
		return institution.institutionId === ownProps.institutionId
	});

	const rechartsData = state.savings[ownProps.institutionId] || [];

	return {
		bankInfo: institutionInfo,
		rechartsData
	}

};

export default connect(mapStateToProps, null)(SavingsChart);

function CustomToolTip(props) {

	if (props.active && props.payload) {

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

	return null;

}
