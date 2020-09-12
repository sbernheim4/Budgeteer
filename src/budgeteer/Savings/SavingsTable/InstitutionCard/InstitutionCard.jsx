import React, { useState, useRef, useEffect, useCallback } from 'react';
import AccountInformation from '../AccountInformation.jsx';
import SavingsChart from './../../SavingsChart/SavingsChart.jsx';
import { determineNewWidth } from './helpers';

import './accountInformation.scss';

export default function InstitutionCard(props) {

	const {
		institutionInfo,
		institutionNames,
		institutionId,
		totalSavings,
	} = props;

	const [width, setWidth] = useState(0);
	const [displayChart, setDisplayChart] = useState(false);

	const institutionNameRef = useRef(null);
	const positionBankName = useCallback(() => determineNewWidth(institutionNameRef), [props.institutionNames]);

	useEffect(() => {

		const newWidth = positionBankName(institutionNameRef);
		setWidth(newWidth);

	}, [props.institutionNames]);

	function displayInstitutionAccounts(institutionInfo, totalSavings) {

		const accountIds = Object.keys(institutionInfo);

		const institutionAccounts = accountIds.map((accountId, i) => {

			return <AccountInformation
				key={i}
				institutionInfo={institutionInfo}
				totalSavings={totalSavings}
				acctId={accountId}
			/>

		}).sort((a, b) => {

			const aAccountId = a.props.acctId;
			const bAccountId = b.props.acctId;

			const aTotal = a.props.institutionInfo[aAccountId].accountBalance;
			const bTotal = b.props.institutionInfo[bAccountId].accountBalance;

			return bTotal - aTotal;

		});

		return institutionAccounts;

	}

	const institutionInfoValues = Object.values(institutionInfo);
	const institutionBalanceTotal = institutionInfoValues.reduce(
		(acc, currVal) => acc + currVal.accountBalance,
		0
	);

	const percent = Math.round(institutionBalanceTotal / totalSavings * 100, 2) === Infinity ?
		'...' :
		Math.round(institutionBalanceTotal / totalSavings * 100, 2);

	const institutionName = institutionNames[institutionId] || 'loading';

	const instituitionClassName = institutionName === 'loading' ?
		'institution-card--info--name institution-card--info--name--loading' :
		'institution-card--info--name';

	return (
		<div className='institution-card'>

			<div className='institution-card--info'
				onClick={() => { setDisplayChart(!displayChart); }}
			>
				<h3 style={{left: `calc(50% - ${width / 2}px`}}>

					<span
						className={instituitionClassName}
						ref={institutionNameRef}
					>
						{institutionName}
					</span>

					<span
						className='institution-card--info--percent'
					> - {percent}%
					</span>

				</h3>

				{displayInstitutionAccounts(institutionInfo, totalSavings)}

			</div>

			<SavingsChart
				displayChart={displayChart}
				institutionId={institutionId}
			/>
		</div>
	);
}
