import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { dollarify } from '../../helpers';

function InstitutionInfoRow(props) {

	const {
		acctId,
		institutionInfo,
		totalSavings,
	} = props

	const displayNames = useSelector((state) => state.app.displayNames ?
		new Map(state.app.displayNames) :
		new Map()
	);

	function getDisplayName(acctId) {
		return displayNames.get(acctId) || institutionInfo[acctId].accountName;
	}

	function getPercentage(numerator, denominator) {
		const percentage = Math.round(numerator / denominator * 100, 2);
		return percentage;
	}

	function getPieChart(percentage) {

		if (percentage <= 0) {
			return;
		}

		const COLORS = ['#79c6a3', '#e4f3ec'];
		const pieChartData = [
			{ name: 'Comprises', value: percentage },
			{ name: 'Outstanding', value: 100 - percentage }
		];

		return (
			<ResponsiveContainer width='100%' height='100%'>
				<PieChart width={100} height={100}>
					<Pie
						dataKey="value"
						startAngle={0}
						endAngle={360}
						data={pieChartData}
					>
						{
							pieChartData.map((_entry, index) => {
								return <Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							})
						}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		);
	}

	const isCreditCardAccount = institutionInfo[acctId].accountType === 'credit';
	const accountBalance = institutionInfo[acctId].accountBalance;
	const normalizedBalance = isCreditCardAccount ? accountBalance * -1 : accountBalance;

	const accountDisplayName = getDisplayName(acctId);
	const accountDisplayBalance = dollarify(normalizedBalance);
	const percentage = getPercentage(normalizedBalance, totalSavings);

	return (
		<div className='networth--entry'>
			<p className='acct-name'>{accountDisplayName}</p>
			<p className='acct-value'>${accountDisplayBalance}</p>
			<div className='acct-percentage'>{getPieChart(percentage)}</div>
		</div>
	);
}

export default InstitutionInfoRow;
