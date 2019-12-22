import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { LineChart, ResponsiveContainer, XAxis, Tooltip, Line } from 'recharts';
import axios from 'axios';
import { isSameDay } from 'date-fns';

import { dollarify } from './../../helpers';

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

	useEffect(() => {

		async function orchestrate() {

			const data = await getData();
			const chartData = generateChartDataPoints(data);

			setRechartsData(chartData);

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

	return (
		<section className='savings-chart'>
			<ResponsiveContainer
				width='100%'
				height='100%'
			>
				<LineChart
					data={rechartsData}
					margin={{ top: 20, right: 35, left: 35, bottom: 10 }}
				>
					<XAxis
						interval={2}
						dataKey='name'
					/>
					<Tooltip content={CustomToolTip} />
					<Line
						type='monotone'
						dataKey='Balance'
						stroke='#79c6a3'
						strokeWidth={4}
					/>
				</LineChart>
			</ResponsiveContainer>
		</section>
	);
}

export default SavingsChart;
