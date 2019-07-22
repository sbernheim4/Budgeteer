import React, { useState, useEffect } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import axios from 'axios';

function NetworthChart(props) {
	const defaultRechartsData = calculateHistoricalNetworth();
	const [rechartsData] = useState(defaultRechartsData);
	useEffect(() => {
		const data = axios({
			method: 'GET',
			url: '/plaid-api/balance'
		});

		data.then((x) => {
			console.log(data);
			console.log(x);
		});
	});

	function calculateHistoricalNetworth() {
		return [
			{ name: 'Jan.', value: 2000 },
			{ name: 'Feb.', value: 3000 },
			{ name: 'Mar.', value: 4000 },
			{ name: 'Apr.', value: 5000 },
			{ name: 'May', value: 6000 },
			{ name: 'June.', value: 7000 },
			{ name: 'July', value: 8000 }
		];
	}

	return (
		<section>
			<LineChart width={730} height={250} data={rechartsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type='monotone' dataKey='value' stroke='#8884d8' />
			</LineChart>
		</section>
	);
}

export default NetworthChart;
