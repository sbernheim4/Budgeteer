import React from 'react';
import { connect } from 'react-redux';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { dollarify } from '../../helpers.js';

function InstitutionInfoRow(props) {

	const {
		acctId,
		institutionInfo,
		totalSavings,
		displayNames
	} = props

	function getDisplayName(acctId) {
		return displayNames.get(acctId) || institutionInfo[acctId].accountName;
	}

	function getAngle(numerator, denominator) {
		const degrees = 360;
		const percentage = Math.round(numerator / denominator * 100, 2);
		const angle = degrees * percentage / 100;

		return angle;
	}

	const isCreditCardAccount = institutionInfo[acctId].accountType === 'credit';
	const accountBalance = institutionInfo[acctId].accountBalance;
	const normalizedBalance = isCreditCardAccount ? accountBalance * -1 : accountBalance;

	const accountDisplayName = getDisplayName(acctId);
	const accountDisplayBalance = dollarify(normalizedBalance);
	const angle = getAngle(normalizedBalance, totalSavings);

	const COLORS = ['#79c6a3', 'white'];
	const pieChartData = [
		{ name: 'Comprises', value: 100 }
	];

	return (
		<div className='networth--entry'>
			<p className='acct-name'>{accountDisplayName}</p>
			<p className='acct-value'>${accountDisplayBalance}</p>
			<div className='acct-percentage'>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart width={100} height={100}>
						<Pie
							dataKey="value"
							startAngle={0}
							endAngle={angle}
							data={pieChartData}
							cy={25}
						>
							{
								pieChartData.map((entry, index) => {
									return <Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								})
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {

	const map = state.app.displayNames ? new Map(state.app.displayNames) : new Map();

	return {
		displayNames: map
	}
};

const mapDispatchToProps = () => {
	return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionInfoRow);
