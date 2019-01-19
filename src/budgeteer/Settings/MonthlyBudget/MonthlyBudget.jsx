/* eslint no-undefined: "off" */

import React, { Component } from "react";
import axios from 'axios';
import BannerMessage from '../../BannerMessage/BannerMessage.jsx';

import './monthlyBudget.scss';

class MonthlyBudget extends Component {
	constructor(props) {
		super(props);

		this.state = {
			monthlyBudget: "Loading...",
			message: "We've updated your monthly budget!",
			color: "green"
		}

		this.updateInputValue = this.updateInputValue.bind(this);
		this.updateMonthlyBudget = this.updateMonthlyBudget.bind(this);
		this.displayMessage = this.displayMessage.bind(this);
	}

	async componentDidMount() {
		// Try looking in local storage first for the monthlyBudget
		let monthlyBudget = localStorage.getItem("monthlyBudget");
		if (!monthlyBudget) {
			// If that fails grab it from the server
			monthlyBudget = await axios.get('/user-info/monthly-budget');
			monthlyBudget = monthlyBudget.data.monthlyBudget;
        }

        this.setState({
            monthlyBudget: monthlyBudget
        });
	}

	updateInputValue(e) {
		const updatedMonthlyBudget = e.target.value.trim();
		this.setState({
			monthlyBudget: updatedMonthlyBudget
		});
	}

	updateMonthlyBudget(e) {
		e.preventDefault();

		const updatedMonthlyBudget = document.querySelector("#monthly-budget").value;

		// Update local storage value
		localStorage.setItem("monthlyBudget", updatedMonthlyBudget);

		// Update Session/DB value
		axios({
			method: 'POST',
			url: '/user-info/monthly-budget',
			data: {
				monthlyBudget: updatedMonthlyBudget
			}
		});

		// Display a success message optimistically
		this.displayMessage();
	}

	displayMessage() {
		console.log("Displaying banner...")
		this.setState({
			display: true
		});

		setTimeout(() => {
			this.setState({
				display: false,
			});
		}, 5500);
	}

	render() {
		return (
            <section className='monthly-budget' onSubmit={this.updateMonthlyBudget}>
				<BannerMessage display={this.state.display} color={this.state.color} text={this.state.message} />

                <h1>Monthly Budget</h1>
                <div>
                    <input id="monthly-budget" placeholder="Loading..." type="number" name="budget" value={this.state.monthlyBudget} onChange={this.updateInputValue} />
                    <button className='submit' onClick={this.updateMonthlyBudget}> Update Budget </button>
                </div>
            </section>
		);
	}
}

export default MonthlyBudget;
