/*eslint no-undefined: 0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTape,
	// faSearch,
	// faTags,
	// faCalendar,
	faUtensils,
	faPlane,
	faShoppingBag,
	faWrench,
	faUsers,
	faMedkit,
	faPercent,
	faMoneyBillAlt,
	faExchangeAlt,
	faQuestion
} from '@fortawesome/free-solid-svg-icons';

import { getDisplayNames } from './../../../redux/actions/app';

import { numberWithCommas, formatAmount, toTitleCase, formatDate } from '../../../helpers';

import './transaction.scss';

class Transaction extends Component {
	constructor(props) {

		super(props);

		this.getAccountNameFromId = this.getAccountNameFromId.bind(this);

	}

	componentDidMount() {
		this.props.getDisplayNames();
	}

	getAccountNameFromId(accountID) {

		try {
			const accountNickName = this.props.displayNames.get(accountID);

			return accountNickName;

		} catch (err) {

			for (const acct of this.props.accounts) {
				if (acct.account_id === accountID) {
					return acct.name;
				}
			}

		}
	}

	getCategoryIcon(categoryName) {

		let categoryIcon;

		switch (categoryName) {
			case 'Food and Drink':
				categoryIcon = faUtensils;
				break;
			case 'Travel':
				categoryIcon = faPlane;
				break;
			case 'Shops':
				categoryIcon = faShoppingBag;
				break;
			case 'Recreation':
				categoryIcon = faTape;
				break;
			case 'Service':
				categoryIcon = faWrench;
				break;
			case 'Community':
				categoryIcon = faUsers;
				break;
			case 'Healthcare':
				categoryIcon = faMedkit;
				break;
			// case "Bank Fees":
			// 	categoryIcon = ;
			// 	break;
			// case "Cash Advance":
			// 	categoryIcon = ;
			// 	break;
			case 'Interest':
				categoryIcon = faPercent;
				break;
			case 'Payment':
				categoryIcon = faMoneyBillAlt;
				break;
			// case "Tax":
			// 	categoryIcon = ;
			// 	break;
			case 'Transfer':
				categoryIcon = faExchangeAlt;
				break;
			default:
				categoryIcon = faQuestion;
		}

		return categoryIcon;

	}

	render() {
		const transaction = this.props.transaction;
		const { date, name, amount, category } = transaction;

		const normalizedDate = formatDate(date);
		const normalizedName = toTitleCase(name);
		const normalizedCategory = category && category !== null ? category[0] : 'Null';
		const amtColor = amount > 0 ? 'amount--amt' : 'amount--amt__green';
        const accountName = this.getAccountNameFromId(transaction.account_id) + ' ';

		let normalizedAmount = formatAmount(amount * -1);
		normalizedAmount = '$' + numberWithCommas(normalizedAmount);

		return (
			<div className='transaction'>
				<div className='transaction__inner-container'>
					<FontAwesomeIcon className='icon' icon={this.getCategoryIcon(normalizedCategory)} />

					<div className='name-info'>
						<p className='name-info--name'>{normalizedName}</p>
						<p className='name-info--category'>
							{accountName}
							<span>{transaction.pending === true ? '- Pending' : ''}</span>
						</p>
					</div>

					<div className='amount'>
						<p className={amtColor}>{normalizedAmount}</p>
						<p className='amount--date'>{normalizedDate}</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {

	const displayNamesMap = state.app.displayNames ? new Map(state.app.displayNames) : new Map();

	return {
		accounts: state.app.accounts || [],
		displayNames: displayNamesMap
	};

};

const mapDispatchToProps = (dispatch) => {

	return {
		getDisplayNames: () => dispatch(getDisplayNames())
	};

};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
