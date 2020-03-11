import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import CategoryItem from './CategoryItem.jsx';

export default function CategoryListGenerator(props) {

	const categories = [
		'Food and Drink',
		'Shops',
		'Service',
		'Healthcare',
		'Bank Fees',
		'Caash Advance',
		'Interest',
		'Payment',
		'Tax',
		'Transfer',
		'Other'
	]

    return (
		<div className='accounts--search-options--icon-search--categorical-search'> <FontAwesomeIcon className='icon' icon={faTags} onMouseEnter={props.openCategoryViewer} />

		{/* display this div when icon above is clicked */}
			<div
				className='accounts--search-options--icon-search--categorical-search--categories'
				onMouseLeave={props.closeCategoryViewer}>
				<div>
					{categories.map((name, index) => {
						return (
							<CategoryItem
								key={index}
								getCategoryTransactions={props.getCategoryTransactions}
								closeCategoryViewer={props.closeCategoryViewer}
								name={name}
							/>
						)
					})}
				</div>
			</div>
	    </div>
    );

}
