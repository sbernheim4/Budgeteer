/* eslint no-undefined: "off" */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BannerMessage from '../../BannerMessage/BannerMessage.jsx';

import './monthlyBudget.scss';

function MonthlyBudget() {

	const [monthlyBudget, setMonthlyBudget] = useState('Loading...');

	useEffect(() => {
		const fetchData = async () => {
			const budget = await getDefaultBudget();
			setMonthlyBudget(budget);
		};

		fetchData();
	}, []);

	const [bannerOptions, setBannerOptions] = useState({
		message: '',
		color: 'green',
		display: false
	});

	useEffect(() => {

		if (bannerOptions.display) {
			setTimeout(() => {
				setBannerOptions({
					message: '',
					color: 'green',
					display: false
				});
			}, 5500);
		}

	});

	function updateMonthlyBudget() {
		// Update local storage value
		localStorage.setItem('monthlyBudget', monthlyBudget);

		// Update Session/DB value
		axios({
			method: 'POST',
			url: '/user-info/monthly-budget',
			data: {
				monthlyBudget: monthlyBudget
			}
		});

		// Display a success message optimistically
		displayMessage('Your monthly budget has budget updated', 'green');
	}

	async function getDefaultBudget() {
		let monthlyBudget = localStorage.getItem('monthlyBudget');
		const retrievedFromLocalStorage = !!monthlyBudget && monthlyBudget !== null && monthlyBudget !== undefined;

		if (retrievedFromLocalStorage) {
			return monthlyBudget;
		} else {
			try {
				monthlyBudget = await axios.get('/user-info/monthly-budget');
				monthlyBudget = monthlyBudget.data.monthlyBudget;

				localStorage.setItem('monthlyBudget', monthlyBudget);

				return monthlyBudget;
			} catch (err) {
				displayMessage('You must enter a monthly budget', 'red');
				return 0;
			}
		}
	}

	function displayMessage(text, color) {
		setBannerOptions({
			message: text,
			color: color,
			display: true
		});
	}

	return (
		<section className='monthly-budget'>
			<BannerMessage display={bannerOptions.display} color={bannerOptions.color} text={bannerOptions.message} />

			<h1>Monthly Budget</h1>
			<div className='monthly-budget__container'>
				<input
					id='monthly-budget'
					placeholder='Loading...'
					type='number'
					name='budget'
					value={monthlyBudget}
					onChange={(e) => setMonthlyBudget(e.target.value)}
				/>
				<button className='submit' onClick={updateMonthlyBudget}>
					{' '}
					Update Budget
				</button>
			</div>
		</section>
	);
}

export default MonthlyBudget;
