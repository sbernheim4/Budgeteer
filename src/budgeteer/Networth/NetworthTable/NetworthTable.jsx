import React from 'react';
import { numberWithCommas, formatAmount, isNumber } from '../../helpers.js';

import './networthTable.scss';

export default function NetworthTable(props) {
	function getDisplayName(name) {
		return props.displayNames.get(name) || '...';
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Account Name</th>
					<th>Amount</th>
				</tr>
			</thead>

			<tbody>
				{props.accountBalances.map((keyName) =>
					Object.keys(keyName).map((acctName, i) => (
						<tr key={i} className='networth--entry'>
							<td className='acct-name'>{getDisplayName(acctName)}</td>
							<td className='acct-value'>
								{isNumber(keyName[acctName])
									? '$' + numberWithCommas(formatAmount(keyName[acctName]))
									: 'N/A'}
							</td>
						</tr>
					))
				)}

				<tr className='networth-total'>
					<td className='networth-total acct-name'>Your Savings</td>
					<td className='networth-total acct-value'>${numberWithCommas(formatAmount(props.networth))}</td>
				</tr>
			</tbody>
		</table>
	);
}
