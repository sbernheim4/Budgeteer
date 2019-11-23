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
	}

	const totalSavingsDisplay = numberWithCommas(formatAmount(props.savings));

	const institutionCards = props.accountBalances.map((institution, i) => {
		return <InstitutionInfo
			key={i}
			displayNames={props.displayNames}
			institutionId={institution.institutionId}
			institutionInfo={institution.institutionBalanceObject}
			institutionNames={props.institutionNames}
			totalSavings={props.savings}
		/>
	});

	institutionCards.sort((a, b) => {

		let totalOne = 0;
		let totalTwo = 0;

		for (const accountId in a.props.institutionInfo) {
			totalOne += a.props.institutionInfo[accountId].accountBalance;
		}
		for (const accountId in b.props.institutionInfo) {
			totalTwo += b.props.institutionInfo[accountId].accountBalance;
		}

		return totalTwo - totalOne;

	});

	return (

		<section className='networth-table'>
			{institutionCards}
			<div className='institution-container'>
				<div className='networth--entry networth--total'>
					<p className='acct-name'>Total Savings</p>
					<p className='acct-value'>${totalSavingsDisplay}</p>
				</div>
			</div>

		</section>
	);
}

function InstitutionInfo(props) {

	const {
		displayNames,
		institutionInfo,
		totalSavings
	} = props;

	const institutionName = props.institutionNames[props.institutionId];
	const institutionCards = Object.keys(institutionInfo).map((acctId, i) => {
		return <InstitutionInfoRow
			key={i}
			displayNames={displayNames}
			institutionInfo={institutionInfo}
			totalSavings={totalSavings}
			acctId={acctId}
		/>
	});

	institutionCards.sort((a, b) => {
		const aAccountId = a.props.acctId;
		const bAccountId = b.props.acctId;
		const aTotal = a.props.institutionInfo[aAccountId].accountBalance;
		const bTotal = b.props.institutionInfo[bAccountId].accountBalance;

		return bTotal - aTotal;
	});

	return (
		<div className='institution-container'>
			<h3>{institutionName}</h3>
			{institutionCards}
		</div>
	);
}

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

	const isCreditCardAccount = institutionInfo[acctId].accountType === 'credit';
	const accountBalance = institutionInfo[acctId].accountBalance;
	const amountToDisplay = isCreditCardAccount ? accountBalance * -1 : accountBalance;

	const accountDisplayName = getDisplayName(acctId);
	const accountDisplayAmount = numberWithCommas(formatAmount(amountToDisplay));
	const accountPercentage = Math.round(accountBalance / totalSavings * 100, 2);
	const accountPercentageDisplay = accountPercentage === 0 ? <p className='acct-percentage'>-</p> : <p className='acct-percentage'>{accountPercentage}%</p>;

	return (
        <div className='networth--entry'>
			<p className='acct-name'>{accountDisplayName}</p>
			<p className='acct-value'>${accountDisplayAmount}</p>
			{accountPercentageDisplay}
		</div>
    );
}
