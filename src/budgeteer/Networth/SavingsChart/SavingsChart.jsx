import React, { useState, useEffect } from 'react';
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line } from 'recharts';
import axios from 'axios';

import './savingsChart.scss';

function SavingsChart(props) {

	const defaultRechartsData = calculateHistoricalNetworth();
	const [rechartsData, setRechartsData] = useState(defaultRechartsData);

	useEffect(() => {
		/*const data = axios({
			method: 'GET',
			url: '/plaid-api/balance'
		});

		data.then((x) => {
			console.log(data);
			console.log(x);
		});*/
	});

	function calculateHistoricalNetworth() {
		return [
			{ name: 'Jan.', Balance: 2000 },
			{ name: 'Feb.', Balance: 2400 },
			{ name: 'Mar.', Balance: 2200 },
			{ name: 'Apr.', Balance: 2500 },
			{ name: 'May', Balance: 2400 },
			{ name: 'June.', Balance: 2700 },
			{ name: 'July', Balance: 2900 }
		];
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
