import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
import { isSameDay } from 'date-fns';

import { dollarify, formatAmount } from './../../helpers';

import './savingsChart.scss';

function CustomToolTip(props) {

	if (props.active) {

		const { payload, label } = props;

		const balance = payload[0].value;
		const displayableBalance = `$${dollarify(balance)}`;

		return (
			<div className="custom-tooltip">
				<p className="label">{`${label} : ${displayableBalance}`} </p>
			</div>
		);

	}

	return null;

}

function SavingsChart(props) {

	const bankInfo = useSelector(state => state.savings.bankInfo);
	const [rechartsData, setRechartsData] = useState([]);
	const [minMax, setMinMax] = useState({min: 0, max: 10});
	const [chartColor, setChartColor] = useState('#79c6a3');

	useEffect(() => {

		async function orchestrate() {

			const data = await getData();
			const chartData = generateChartDataPoints(data);
			const bounds = getChartBounds(chartData);

			setMinMax(bounds);
			setRechartsData(chartData);
			determineChartColor(chartData);

			await conditionallyUploadNewData(chartData);

		}

		orchestrate();

	}, [props.institutionId]);

	async function getData () {

		const historicalDataRequest = await axios({
			method: 'get',
			url: `/savings/data?id=${props.institutionId}`
		});

		return historicalDataRequest.data;

	}

	function generateChartDataPoints(data) {

		const chartData = data.map(dataPoint => {

			const { date: dateString, institutionalBalance } = dataPoint;

			const date = new Date(dateString);
			const displayDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

			return {
				name: displayDate,
				Balance: institutionalBalance
			}

		});

		const sortedChartData = chartData.sort((a, b) => {
			return new Date(a.name) - new Date(b.name);
		});

		return sortedChartData;

	}

	async function conditionallyUploadNewData(chartData) {

		const today = new Date();
		const mostRecentDataPoint = chartData[chartData.length - 1].name;
		const mostRecentDataPointDate = new Date(mostRecentDataPoint);

		if (chartData.length === 0 || !isSameDay(mostRecentDataPointDate, today) && bankInfo ) {
			return await uploadData(bankInfo);
		}

	}

	async function uploadData(bankInfo) {

		// TODO: This function should only update an institution's savings history and not the object for all institutions
		//
		// Filter bankInfo looking for where id === props.id and update that --> Will require a server update as well
		// const institutionSavingsHistory = bankInfo.filter(obj => obj.institutionId === props.id);
		// const serializedInstitutionSavingsHistory = JSON.stringify(institutionSavingsHistory);

		const serializedBankInfo = JSON.stringify(bankInfo);

		await axios({
			method: 'post',
			url: '/savings/data',
			data: serializedBankInfo,
			headers: {
				'Content-Type': 'application/json'
			}
		});

	}

	function getChartBounds(data) {

		const multiplier = .05;
		const normalizer = 100;

		const balances = data.map(dataPoint => dataPoint.Balance);

		const min = Math.min(...balances);
		const max = Math.max(...balances);

		// Add some space above and below the min and max values
		const paddedMin = parseFloat(formatAmount((1 - multiplier) * min));
		const paddedMax = parseFloat(formatAmount((1 + multiplier) * max));

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
						interval={2}
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

export default SavingsChart;
