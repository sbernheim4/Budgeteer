import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faExchangeAlt,
	faMedkit,
	faMoneyBillAlt,
	faPercent,
	faPlane,
	faQuestion,
	faShoppingBag,
	faTags,
	faTape,
	faUsers,
	faUtensils,
	faWrench,
} from '@fortawesome/free-solid-svg-icons';

import CategoryItem from './CategoryItem.jsx';

export default function CategoryListGenerator(props) {

	const categoryIconMap = {
		'Bank Fees': faQuestion,
		'Caash Advance': faQuestion,
		'Community': faUsers,
		'Food and Drink': faUtensils,
		'Healthcare': faMedkit ,
		'Interest': faPercent,
		'Other': faQuestion,
		'Payment': faMoneyBillAlt,
		'Recreation': faTape,
		'Service': faWrench,
		'Shops': faShoppingBag,
		'Tax': faQuestion,
		'Transfer': faExchangeAlt,
		'Travel': faPlane
	}

    return (
		<div className='accounts--search-options--icon-search--categorical-search'> <FontAwesomeIcon className='icon' icon={faTags} onMouseEnter={props.openCategoryViewer} />

		{/* display this div when icon above is clicked */}
			<div
				className='accounts--search-options--icon-search--categorical-search--categories'
				onMouseLeave={props.closeCategoryViewer}>
				<div>
					{Object.keys(categoryIconMap).map((name, index) => {
						return (
							<CategoryItem
								key={index}
								getCategoryTransactions={props.getCategoryTransactions}
								closeCategoryViewer={props.closeCategoryViewer}
								name={name}
								icon={categoryIconMap[name]}
							/>
						)
					})}
				</div>
			</div>
	    </div>
    );

}
