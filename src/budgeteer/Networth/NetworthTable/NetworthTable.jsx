import React, {useState, useEffect, useRef } from 'react';

import { dollarify } from '../../helpers.js';

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

	const totalSavingsDisplay = dollarify(props.savings);
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
		institutionNames,
		institutionId,
		totalSavings
	} = props;

	const [width, setWidth] = useState(0);
	const institutionNameRef = useRef(null);
	useEffect(() => {
		const width = institutionNameRef.current ? institutionNameRef.current.offsetWidth : 0;
		setWidth(width);
	}, [institutionNameRef.current]);

	function generateInstitutionInfoRows(institutionInfo) {

		const institutionInfoKeys = Object.keys(institutionInfo);

		const institutionInfoRows = institutionInfoKeys.map((acctId, i) => {
			return <InstitutionInfoRow
				key={i}
				displayNames={displayNames}
				institutionInfo={institutionInfo}
				totalSavings={totalSavings}
				acctId={acctId}
			/>
		});

		institutionInfoRows.sort((a, b) => {
			const aAccountId = a.props.acctId;
			const bAccountId = b.props.acctId;
			const aTotal = a.props.institutionInfo[aAccountId].accountBalance;
			const bTotal = b.props.institutionInfo[bAccountId].accountBalance;

			return bTotal - aTotal;
		});

		return institutionInfoRows;

	}

	const institutionBalanceTotal = Object.values(institutionInfo).reduce((acc, currVal) => acc + currVal.accountBalance, 0);
	const institutionName = institutionNames[institutionId];
	const percent = Math.round(institutionBalanceTotal / totalSavings * 100, 2);
	const institutionInfoRows = generateInstitutionInfoRows(institutionInfo);

	return (
		<div className='institution-container'>

			<h3 style={{left: `calc(50% - ${width / 2}px`}}>
				<span
					className='institution-container--name'
					ref={institutionNameRef}
				>
				{institutionName}
				</span>

				<span
					className='percent'
				> - {percent}%
				</span>

			</h3>

			{institutionInfoRows}
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

	function getPercentageString(numerator, denominator) {
		const percentage = Math.round(numerator / denominator * 100, 2);
		return percentage <= 0 ? '-' : `${percentage}%`;
	}

	const isCreditCardAccount = institutionInfo[acctId].accountType === 'credit';
	const accountBalance = institutionInfo[acctId].accountBalance;
	const normalizedBalance = isCreditCardAccount ? accountBalance * -1 : accountBalance;

	const accountDisplayName = getDisplayName(acctId);
	const accountDisplayBalance = dollarify(normalizedBalance);
	const percentage = getPercentageString(normalizedBalance, totalSavings);

	return (
		<div className='networth--entry'>
			<p className='acct-name'>{accountDisplayName}</p>
			<p className='acct-value'>${accountDisplayBalance}</p>
			<p className='acct-percentage'>{percentage}</p>
		</div>
	);
}
