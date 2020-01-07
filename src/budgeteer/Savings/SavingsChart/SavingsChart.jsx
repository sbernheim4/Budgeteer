import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
import { isSameDay } from 'date-fns';

import { getSavingsChartData } from './../../redux/actions/savings';

import { dollarify, formatAmount } from './../../helpers';

import './savingsChart.scss';

function SavingsChart(props) {

	const chartData = useSelector(state => state.savings[props.institutionId]) || [];
	const [rechartsData, setRechartsData] = useState(chartData);
	const [minMax, setMinMax] = useState({min: 0, max: 10});
	const [chartColor, setChartColor] = useState('#79c6a3');

	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(getSavingsChartData(props.institutionId));

		const bounds = getChartBounds(rechartsData);

		setMinMax(bounds);
		setRechartsData(rechartsData);
		determineChartColor(rechartsData);

		async function uploadNewDataPoints() {
			await conditionallyUploadNewData(chartData);
		}

		uploadNewDataPoints();

	}, [props.institutionId]);

	async function conditionallyUploadNewData(chartData) {

		if (chartData.length === 0) {
			return await uploadData();
		}

		const today = new Date();
		const mostRecentDataPoint = chartData[chartData.length - 1].name;
		const mostRecentDataPointDate = new Date(mostRecentDataPoint);

		if (!isSameDay(mostRecentDataPointDate, today) && props.bankInfo ) {
			return await uploadData();
		}

	}

	async function uploadData() {

		const serializedBankInfo = JSON.stringify(props.bankInfo);

		try {

			await axios({
				method: 'post',
				url: '/savings/data',
				data: serializedBankInfo,
				headers: {
					'Content-Type': 'application/json'
				}
			});

		} catch (error) {

			console.log(error);

		}
	}

	function getChartBounds(data) {

		const multiplier = .03;
		const normalizer = 100;

		const balances = data.map(dataPoint => dataPoint.Balance);

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

		const balances = chartData.map(dataPoint => dataPoint.Balance);
		const positiveValues = balances.filter(balance => balance >= 0);

		if (positiveValues.length === 0) {
			setChartColor('#c67d79');
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
						dataKey='Balance'
						stroke={chartColor}
						fill={chartColor}
						strokeWidth={4}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</section>
	);
}

const mapStateToProps = (state, ownProps) => {

	const institutionInfo = state.savings.bankInfo.find(institution => {
		return institution.institutionId === ownProps.institutionId
	});

	return {
		bankInfo: institutionInfo
	}

};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavingsChart);

function CustomToolTip(props) {

	if (props.active && props.payload) {

		const { payload, label } = props;

		const balance = payload[0].value;
		const displayableBalance = `$${dollarify(balance)}`;
		const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

		const date = label.split('/');
		const [month, day, year] = date;
		const writtenMonth = months[month - 1];
		const writtenYear = year.slice(2);

		return (
			<div className="savings-chart-tooltip">
				<p>{writtenMonth}. {day} '{writtenYear}</p>
				<p>{displayableBalance}</p>
			</div>
		);

	}

	return null;

}
