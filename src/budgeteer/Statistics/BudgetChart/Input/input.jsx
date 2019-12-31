import React from 'react';

export default function Input(props) {

	const inputField = (
		<form className='budget--form'>
			<label>
				<input
					placeholder='Enter your budget'
					type='number'
					name='budget'
					value={props.monthlyBudget}
					onChange={props.updateMonthlyBudget}
				/>
			</label>
		</form>
	);

	return props.display === false ? '' : inputField;

}
