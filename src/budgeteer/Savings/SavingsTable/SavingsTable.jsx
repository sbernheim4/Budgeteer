import React from 'react';
import { connect } from 'react-redux';

import InstitutionCard from './InstitutionCard.jsx';

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
		institutionNames,
		storeNewChartData
	} = props;

	function generateInstitutionCards(accountBalances) {

		const institutionCards = accountBalances.map((institution, i) => {
			return <InstitutionCard
				key={i}
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

const mapDispatchToProps = () => {
	return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SavingsTable);
