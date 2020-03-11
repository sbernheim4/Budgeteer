import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';

export default function CategoryAccountGenerator(props) {

	const accounts = props.accounts.map((a, index) => {
		return <button
			key={index}
			onClick={() => {
				props.getAccountTransactions(a.account_id);
				props.closeAccountsViewer();
			}}>
			{props.getAccountDisplayName(a.account_id, a.name)}
		</button>
	});

	return (
		<div className='accounts--search-options--icon-search--accts-search'>
			<FontAwesomeIcon
				className='icon'
				icon={faUniversity}
				onMouseEnter={props.openAccountsViewer}
			/>

			<div
				className='accounts--search-options--icon-search--accts-search--accts'
				onMouseLeave={props.closeAccountsViewer}>
				<div>
					<button
						onClick={() => {
							props.getAccountTransactions('all');
							this.closeAccountsViewer();
						}}>
						All Transactions
					</button>

					{accounts}
				</div>
			</div>
		</div>

	);
}
