import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './landing-page.scss';

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div className='home'>
				<section className='landing-page'>
					<h1>Budgeting done right</h1>
					<img src='/landing-page-image.png' />
				</section>

				<section id='product' className='product'>
					<h2>Track Your Spending Across All Your Accounts</h2>
					<p>View and search each transaction you make</p>
					<p>Get meaningful feedback that helps you understand your spending patterns</p>
					<p>Easily view each of your accounts' balance</p>
					<p>Track monthly recurring expenses like Netflix, Spotify, HBO NOW, etc</p>
					<p>Easily add or remove accounts without any fuss</p>
				</section>

				<section id='about' className='about'>
					<h2>Why is a budgeting tool is necessary?</h2>
					<p>On average people have 3 credit cards and 2 bank accounts. That's a lot to track</p>
					<p>57% of people have less than $1,000 in savings</p>
					<p>Budgeteer lets you link all your accounts in one place</p>
					<p>Seeing is believing. Visualizing all your information will help reduce your spending</p>
				</section>

				<section id='pricing' className='pricing'>
					<h2>What's the damage?</h2>
					<p>A cup of coffee and a muffin</p>

					<div className='pricing--amount'>
						<h1>$7</h1>
						<p>/month</p>
					</div>
				</section>
			</div>
		);
	}
}

export default LandingPage;
