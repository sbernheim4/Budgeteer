import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

export default function CategoryItem (props) {

	return (
		<section>
			<FontAwesomeIcon
				className='category-icon'
				onClick={() => {
					props.getCategoryTransactions(props.name);
					props.closeCategoryViewer();
				}}
				icon={faUtensils}
			/>
			<p>{props.name}</p>
		</section>

	);
}
	/*
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Travel');
								props.closeCategoryViewer();
							}}
							icon={faPlane}
						/>
						<p>Travel</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Shops');
								props.closeCategoryViewer();
							}}
							icon={faShoppingBag}
						/>
						<p>Shops</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Recreation');
								props.closeAccountsViewer();
							}}
							icon={faTape}
						/>
						<p>Recreation</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Service');
								props.closeCategoryViewer();
							}}
							icon={faWrench}
						/>
						<p>Service</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Community');
								props.closeCategoryViewer();
							}}
							icon={faUsers}
						/>
						<p>Community</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Healthcare');
								props.closeCategoryViewer();
							}}
							icon={faMedkit}
						/>
						<p>Healthcare</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Bank Fees');
								props.closeCategoryViewer();
							}}
							icon={faQuestion}
						/>
						<p>Bank Fees</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Cash Advance');
								props.closeCategoryViewer();
							}}
							icon={faQuestion}
						/>
						<p>Cash Advance</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Interest');
								props.closeCategoryViewer();
							}}
							icon={faPercent}
						/>
						<p>Interest</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Payment');
								props.closeCategoryViewer();
							}}
							icon={faMoneyBillAlt}
						/>
						<p>Payment</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Tax');
								props.closeCategoryViewer();
							}}
							icon={faQuestion}
						/>
						<p>Tax</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Transfer');
								props.closeCategoryViewer();
							}}
							icon={faExchangeAlt}
						/>
						<p>Transfer</p>
					</section>
					<section>
						<FontAwesomeIcon
							className='category-icon'
							onClick={() => {
								props.getCategoryTransactions('Other');
								props.closeCategoryViewer();
							}}
							icon={faQuestion}
						/>
						<p>Other</p>
					</section>
			*/
