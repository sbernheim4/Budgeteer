import React from 'react';
import { numberWithCommas, formatAmount, isNumber } from '../../helpers.js';

import './networthTable.scss';

export default function NetworthTable(props) {
	if (props.accountBalances.length === 0) {
		return (
			<div className='networth--loading'>
				<h1>Hang tight, getting your data from the cloud</h1>
				<img src='/loading-gifs/loading-three.gif' alt='loading' />
			</div>
		);
	} else {
		return (
			<section>
				{props.accountBalances.map((institution, i) => (
					<InstitutionInfo
						key={i}
						displayNames={props.displayNames}
						institutionId={institution.institutionId}
						institutionInfo={institution.institutionBalanceObject}
					/>
				))}

				<table>
					<tbody>
						<tr className='networth-total'>
							<td className='networth-total acct-name'>Savings</td>
							<td className='networth-total acct-value'>
								${numberWithCommas(formatAmount(props.networth))}
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		);
	}
}

function InstitutionInfo(props) {
	function getDisplayName(name) {
		return props.displayNames.get(name) || '...';
	}

	const institutionInfo = props.institutionInfo;

	return (
		<table>
			{/* <thead>
				<tr>
					<td className=''>{props.institutionId}</td>
				</tr>
			</thead> */}

			<tbody>
				{Object.keys(institutionInfo).map((acctId, i) => (
					<tr key={i} className='networth--entry'>
						<td className='acct-name'>{getDisplayName(acctId)}</td>
						<td className='acct-value'>
							$
							{numberWithCommas(
								formatAmount(
									institutionInfo[acctId].accountType === 'credit'
										? institutionInfo[acctId].accountBalance * -1
										: institutionInfo[acctId].accountBalance
								)
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
