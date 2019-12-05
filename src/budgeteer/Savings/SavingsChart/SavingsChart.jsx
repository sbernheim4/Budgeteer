import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { LineChart, ResponsiveContainer, XAxis, Tooltip, Line } from 'recharts';
import axios from 'axios';
import { isSameDay } from 'date-fns';

import { dollarify } from './../../helpers';

import './savingsChart.scss';

function SavingsChart(props) {

	const bankInfo = useSelector(state => state.savings.bankInfo);

	const [rechartsData, setRechartsData] = useState([]);

	useEffect(() => {

		const getData = async () => {

			const historicalDataRequest = await axios({
				method: 'get',
				url: `/savings/data?id=${props.institutionId}`
			});

			const { data } = historicalDataRequest;
			const chartData = data.map(dataPoint => {

				const { date: dateString, institutionalBalance } = dataPoint;

				const date = new Date(dateString);

				const displayBalance = dollarify(institutionalBalance);
				const displayDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

				return {
					name: displayDate,
					Balance: displayBalance
				}
			});

			if (chartData.length === 0) {
				return await storeNewChartData(bankInfo);
			}

			const today = new Date();
			const mostRecentDataPoint = chartData[0].name;
			const mostRecentDataPointDate = new Date(mostRecentDataPoint);

			if (!isSameDay(mostRecentDataPointDate, today) && bankInfo) {
				await storeNewChartData(bankInfo);
			}

			setRechartsData(chartData);
		}

		getData();

	}, [props.institutionId]);

	async function storeNewChartData(bankInfo) {

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
					margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
				>
					<XAxis
						interval={2}
						dataKey='name'
					/>
					<Tooltip />
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
