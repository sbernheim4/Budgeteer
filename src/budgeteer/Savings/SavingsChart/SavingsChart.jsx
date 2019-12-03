import React, { useState, useEffect } from 'react';
import { LineChart, ResponsiveContainer, XAxis, Tooltip, Line } from 'recharts';
import axios from 'axios';

import { dollarify } from './../../helpers';

import './savingsChart.scss';

function SavingsChart(props) {

	const [rechartsData, setRechartsData] = useState([]);

	useEffect(() => {

		const getData = async () => {

			const historicalDataRequest = await axios({
				method: 'get',
				url: `/savings/data?id=${props.institutionId}`
			});

			const { data } = historicalDataRequest;
			const chartData = data.map(dataPoint => {

				const { date: dateString, institutionBalance } = dataPoint;

				const date = new Date(dateString);

				const displayBalance = dollarify(institutionBalance);
				const displayDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

				return {
					name: displayDate,
					Balance: displayBalance
				}
			});

			setRechartsData(chartData);
		}

		getData();

	}, [props.institutionId]);

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
