import React from 'react';
import { connect } from 'react-redux';

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
