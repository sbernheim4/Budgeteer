import React, { Component } from 'react';
import '../scss/budget.scss';

import Chart from 'chart.js';

class Budget extends Component {
    constructor(props){
        super(props);
        this.state = {
            monthlyBudget: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateChart = this.generateChart.bind(this);
    }

    handleChange(event) {
        // Update the state variable
        this.setState({ monthlyBudget: event.target.value });

        // Update the percentage calculator
        const graph = document.querySelector('.budget--graph > div');
        let percentage = (this.props.totalSpent / event.target.value) * 100;
        graph.style.width = percentage + "%";

        const spent = this.props.totalSpent;
        let remaining = (event.target.value - this.props.totalSpent).toFixed(2);
        if (remaining <= 0) {
            remaining = 0;
        }

        // Update the pie chart
        this.generateChart(spent, remaining);
    }
    
    numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    generateChart(totalSpent, totalRemaining) {
        console.log("totalSpent: ", totalSpent);
        console.log("totalRemaining: ", totalRemaining);

        const ctx = document.querySelector('#myChart');

        let myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Spent", "Remaining"],
                datasets: [{
                    backgroundColor: ["rgb(212,99,99)", "rgb(77, 153, 114)"],
                    data: [
                        totalSpent,
                        totalRemaining
                    ]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "This Month's Budget"
                }
            }
        });
    }

    render() {

        let spent = this.numberWithCommas(this.props.totalSpent);

        let remaining = (this.state.monthlyBudget - this.props.totalSpent).toFixed(2);
        remaining = this.numberWithCommas(remaining);

        return (
            <div className='budget'>

                <h2 className='budget--total-spent'>Spent: ${spent}</h2>
                <h2 className='budget--total-left'>Remaining: ${remaining}</h2>

                <form className='budget--form'>
                    <label>
                        <span>Monthly Budget:</span>
                        <input placeholder='Enter your budget' type='number' name='budget' value={this.state.monthlyBudget} onChange={this.handleChange} />
                    </label>
                </form>

                <p className='budget--percent'>{((this.props.totalSpent / this.state.monthlyBudget)*100).toFixed(2) || 0}% spent</p>

                <div className='budget--graph'>
                    <div></div>
                </div>
                
                <canvas className='budget--pie-char' id="myChart"></canvas>

            </div>
        );
    }
}

export default Budget;