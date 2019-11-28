import React, { useState, useEffect } from 'react';
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line } from 'recharts';

import { dollarify } from './../../helpers';

import './savingsChart.scss';

function SavingsChart(props) {

	const {
		historicalSavings = [],
		institutionId
	} = props;

	const [rechartsData, setRechartsData] = useState([]);

	useEffect(() => {

		const data = historicalSavings.map((info) => {
			const { date, savingsData } = info;
			const dateString = new Date(date).toDateString();
			const currentInstitutionSavingsData = savingsData.filter(institution => institution.institutionId === institutionId)[0];
			const balance = dollarify(currentInstitutionSavingsData.institutionBalance);

			return {
				name: dateString,
				Balance: balance
			}

		});

		setRechartsData(data);

	}, [props.historicalSavings]);

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
