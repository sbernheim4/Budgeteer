import React, { Component } from 'react';
import TransactionContainer from './TransactionContainer.jsx';
import '../scss/categoryContainer.scss'

class CategoryContainer extends Component {
	constructor(props) {
		super(props);

		this.getCategory = this.getCategory.bind(this);

		this.state = {
			categoryTransactions: []
		};
		
	}

	componentDidMount() {

	}

	getCategory(categoryString) {
		let releventTransactions = [];

		if (categoryString === 'Other') {
			this.props.transactions.forEach(t => {
				if (t.category === null) {
					releventTransactions.push(t);
				}
			});
		} else {
			this.props.transactions.forEach(t => {
				if (t.category !== null && t.category.includes(categoryString)) {
					releventTransactions.push(t);
				}
			});
		}

		this.setState({ categoryTransactions: releventTransactions })
	}

	render() {
		let container = null
		if (this.state.categoryTransactions.length === 0) {
			container = '';
		} else {
			container = <TransactionContainer className='category--transactions' transactions={this.state.categoryTransactions} />;
		}

		return (
			<div className='category'>
				<div className='category--btns'>
					<h3>Sort by Categories</h3>
					<button className='home--category-btns' onClick={() => { this.getCategory('Food and Drink') }}>Food and Drink</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Travel') }}>Travel</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Shops') }}>Shops</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Recreation') }}>Recreation</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Service') }}>Service</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Community') }}>Community</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Healthcare') }}>Healthcare</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Other') }}>Other</button>

					<br />
					{/* TODO: These categories should be in a do more section */}
					<button className='home--category-btns' onClick={() => { this.getCategory('Bank Fees') }}>Bank Fees</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Cash Advance') }}>Cash Advance</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Interest') }}>Interest</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Payment') }}>Payment</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Tax') }}>Tax</button>
					<button className='home--category-btns' onClick={() => { this.getCategory('Transfer') }}>Transfer</button>
				</div>

				{container}

			</div>
		);
	}
}

export default CategoryContainer;