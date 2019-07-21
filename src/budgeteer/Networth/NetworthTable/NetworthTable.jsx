import React from 'react';
import { numberWithCommas, formatAmount, isNumber } from '../../helpers.js';

import './networthTable.scss';

export default function NetworthTable(props) {
	function getDisplayName(name) {
		return props.displayNames.get(name) || '...';
	}

	if (props.accountBalances.length > 0) {
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
						<td className='networth-total acct-name'>Savings</td>
						<td className='networth-total acct-value'>${numberWithCommas(formatAmount(props.networth))}</td>
					</tr>
				</tbody>
			</table>
		);
	} else {
		return (
			<div className='networth--loading'>
				<h1>Hang tight, getting your data from the cloud</h1>
				<img src='/loading-gifs/loading-three.gif' alt='loading' />
			</div>
		);
	}
}
