import React from 'react';
import { useSelector } from 'react-redux';

import { InstitutionBalance } from './InstitutionCard/InstitutionCard.jsx';

import { dollarify } from '../../helpers.js';

import './savingsTable.scss';

function SavingsTable(props) {

    const accountBalances = useSelector(state => state.savings.bankInfo);

	const accountBalancesLoaded = accountBalances.length > 0;

	if (!accountBalancesLoaded) {

		return (
			<div className='networth--loading'>
				<h1>Hang tight, getting your data from the cloud</h1>
				<img src='/loading-gifs/loading-three.gif' alt='loading' />
			</div>
		);

	}

	const { savings, institutionNames, } = props;

	function generateInstitutionCards(accountBalances) {

		const institutionCards = accountBalances.map((institution, i) => {
			return <InstitutionBalance
				key={i}
				institutionId={institution.institutionId}
				institutionInfo={institution.institutionBalanceObject}
				institutionNames={institutionNames}
				totalSavings={savings}
			/>
		}).sort((a, b) => {

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
			{ institutionCards }

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

export default SavingsTable;
