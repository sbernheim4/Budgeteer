import React from 'react';

import { useSavingsData, useDisplayNames, useInstitutionIds } from './hooks.ts';
import SavingsTable from './SavingsTable/SavingsTable.jsx';

import './savings.scss';

const Savings = () => {

	useDisplayNames();

	const savings = useSavingsData();
	const institutionNames = useInstitutionIds();

	return (

		<div className='networth'>
			<SavingsTable
				savings={savings}
				institutionNames={institutionNames}
			/>
		</div>

	);

};

export default Savings;
