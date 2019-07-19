import React, { Component } from 'react';

class Input extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.display === false) {
			return '';
		} else {
			return (
				<form className='budget--form'>
					<label>
						<input
							placeholder='Enter your budget'
							type='number'
							name='budget'
							value={this.props.monthlyBudget}
							onChange={this.props.updateMonthlyBudget}
						/>
					</label>
				</form>
			);
		}
	}
}

export default Input;
