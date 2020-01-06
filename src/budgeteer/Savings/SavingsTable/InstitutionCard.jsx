import React, { useState, useRef, useEffect } from 'react';

import InstitutionInfoRow from './InstitutionInfoRow.jsx';
import SavingsChart from './../SavingsChart/SavingsChart.jsx';

import './institutionCard.scss';

export default function InstitutionCard(props) {

	const {
		institutionInfo,
		institutionNames,
		institutionId,
		totalSavings,
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
	const institutionName = institutionNames[institutionId] || 'loading';
    const percent = Math.round(institutionBalanceTotal / totalSavings * 100, 2) === Infinity ?
		'...' :
		Math.round(institutionBalanceTotal / totalSavings * 100, 2);
	const institutionInfoRows = generateInstitutionInfoRows(institutionInfo);
	const instituitionClassName = institutionName === 'loading' ?
		'institution-card--info--name institution-card--info--name--loading' :
		'institution-card--info--name';

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

				{institutionInfoRows}
			</div>

			<SavingsChart
				institutionId={institutionId}
			/>
		</div>
	);
}
