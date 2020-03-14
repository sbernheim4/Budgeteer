import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CategoryItem (props) {

	return (
		<section>
			<FontAwesomeIcon
				className='category-icon'
				onClick={() => {
					props.getCategoryTransactions(props.name);
					props.closeCategoryViewer();
				}}
				icon={props.icon}
			/>
			<p>{props.name}</p>
		</section>

	);
}
