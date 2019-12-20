import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import SavingsChart from './../SavingsChart/SavingsChart.jsx';

import { dollarify } from '../../helpers.js';

import './savingsTable.scss';

function SavingsTable(props) {
	const accountBalancesLoaded = props.accountBalances.length > 0;

	if (!accountBalancesLoaded) {

		return (
			<div className='networth--loading'>
				<h1>Hang tight, getting your data from the cloud</h1>
				<img src='/loading-gifs/loading-three.gif' alt='loading' />
			</div>
		);
	}

	const {
		savings,
		accountBalances,
		displayNames,
		institutionNames,
		storeNewChartData
	} = props;

	function generateInstitutionCards(accountBalances) {

		const institutionCards = accountBalances.map((institution, i) => {
			return <InstitutionCard
				key={i}
				displayNames={displayNames}
				institutionId={institution.institutionId}
				institutionInfo={institution.institutionBalanceObject}
				institutionNames={institutionNames}
				totalSavings={savings}
				storeNewChartData={storeNewChartData}
			/>
		});

		institutionCards.sort((a, b) => {

			const aInstitutionInfoValues = Object.values(a.props.institutionInfo);
			const bInstitutionInfoValues = Object.values(b.props.institutionInfo);

			const institutionBalanceA = aInstitutionInfoValues.reduce((acc, currVal) => acc + currVal.accountBalance, 0);
			const institutionBalanceB = bInstitutionInfoValues.reduce((acc, currVal) => acc + currVal.accountBalance, 0);

			return institutionBalanceB - institutionBalanceA;
		});

		return institutionCards;

	}

	const institutionCards = generateInstitutionCards(accountBalances);
	const totalSavingsDisplay = dollarify(savings);

	return (
		<section className='networth-table'>
			{institutionCards}

			<div className='institution-card'>
				<div className='institution-card--info'>
					<div className='networth--entry networth--total'>
						<p className='acct-name'>Total Savings</p>
						<p className='acct-value'>${totalSavingsDisplay}</p>
					</div>
				</div>
			</div>

		</section>
	);
}

const mapStateToProps = (state) => {
    return {
        accountBalances: state.savings.bankInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SavingsTable);

function InstitutionCard(props) {

	const {
		displayNames,
		institutionInfo,
		institutionNames,
		institutionId,
		totalSavings,
		storeNewChartData
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

	const institutionInfoValues = Object.values(institutionInfo);
	const institutionBalanceTotal = institutionInfoValues.reduce((acc, currVal) => acc + currVal.accountBalance, 0);
	const institutionName = institutionNames[institutionId];
	const percent = Math.round(institutionBalanceTotal / totalSavings * 100, 2);
	const institutionInfoRows = generateInstitutionInfoRows(institutionInfo);

	function handleClick(e) {
		const card = e.target.closest(".institution-card").querySelector(".savings-chart");
		card.classList.toggle('savings-chart--show');
	}

	return (
		<div className='institution-card'>

			<div className='institution-card--info'
				onClick={(e) => handleClick(e)}
			>
				<h3 style={{left: `calc(50% - ${width / 2}px`}}>
					<span
						className='institution-card--info--name'
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

			<SavingsChart
				institutionId={institutionId}
				storeNewChartData={storeNewChartData}
			/>
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
