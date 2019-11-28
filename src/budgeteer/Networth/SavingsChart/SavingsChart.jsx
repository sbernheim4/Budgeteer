import React, { useState, useEffect } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import axios from 'axios';

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
			{ name: 'Feb.', Balance: 3000 },
			{ name: 'Mar.', Balance: 4000 },
			{ name: 'Apr.', Balance: 5000 },
			{ name: 'May', Balance: 6000 },
			{ name: 'June.', Balance: 7000 },
			{ name: 'July', Balance: 8000 }
		];
	}

	return (
		<section className='savings-chart'>
			<LineChart
				height='100%' width='100%'
				data={rechartsData}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Line
					type='monotone'
					dataKey='Balance'
					stroke='#8884d8'
					strokeWidth={4}
				/>
			</LineChart>
		</section>
	);
}

export default SavingsChart;
