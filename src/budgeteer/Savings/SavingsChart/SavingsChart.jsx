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
			const chartData = data.map(info => {
				const date = new Date(info.date);
				const balance = info.savingsData[0].institutionBalance;
				const balanceString = dollarify(balance);
				const dateString = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

				return {
					name: dateString,
					Balance: balanceString
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
					<XAxis dataKey='name' />
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
