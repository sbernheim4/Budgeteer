import React from 'react';

import { numberWithCommas, formatAmount } from '../../helpers.js';

import './networthTable.scss';

export default function NetworthTable(props) {
	const accountBalancesLoaded = props.accountBalances.length > 0;

	if (!accountBalancesLoaded) {

		return (
			<div className='networth--loading'>
				<h1>Hang tight, getting your data from the cloud</h1>
				<img src='/loading-gifs/loading-three.gif' alt='loading' />
			</div>
		);

	} else {

		const totalSavingsDisplay = numberWithCommas(formatAmount(props.savings));

		return (
			<section className='networth-table'>

				{props.accountBalances.map((institution, i) => (
					<InstitutionInfo
						key={i}
						displayNames={props.displayNames}
						institutionId={institution.institutionId}
						institutionInfo={institution.institutionBalanceObject}
                        institutionNames={props.institutionNames}
                        totalSavings={props.savings}
					/>
				))}

				<div className='institution-container'>
					<div className='networth--entry networth--total'>
						<p className='acct-name'>Total Savings</p>
						<p className='acct-value'>${totalSavingsDisplay}</p>
					</div>
				</div>

			</section>
		);
	}
}

function InstitutionInfo(props) {

	const {
		displayNames,
		institutionInfo,
		totalSavings
	} = props;

	const institutionName = props.institutionNames[props.institutionId];

	let total = 0;

	for (const account in props.institutionInfo) {
		const accountInfo = props.institutionInfo[account];
		total += accountInfo.accountBalance;
	}

	return (
		<div className='institution-container'>
			<h3>{InstitutionName}</h3>

			{Object.keys(institutionInfo).map((acctId, i) => (

				<div key={i} className='networth--entry'>
					<p className='acct-name'>{getDisplayName(acctId)}</p>
					<p className='acct-value'>
						$
						{numberWithCommas(
							formatAmount(
								institutionInfo[acctId].accountType === 'credit'
									? institutionInfo[acctId].accountBalance * -1
									: institutionInfo[acctId].accountBalance
							)
						)}
					</p>
					<p className='acct-percentage'>{Math.round(institutionInfo[acctId].accountBalance / total * 100, 2)}%</p>
				</div>

			))}

		</div>

	);

}
