import React, { Component } from 'react';
import '../scss/budget.scss'
class Budget extends Component {
    constructor(props){
        super(props);
        this.state = {
            monthlyBudget: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // Update the state variable
        this.setState({ monthlyBudget: event.target.value });

        // Update the percentage calculator
        const graph = document.querySelector('.budget--graph > div');
        let percentage = (this.props.totalSpent / event.target.value) * 100;
        graph.style.width = percentage + "%";
    }
    
    numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {

        let spent = this.numberWithCommas(this.props.totalSpent);

        let left = (this.state.monthlyBudget - this.props.totalSpent).toFixed(2);
        left = this.numberWithCommas(left);

        return (
            <div className='budget'>
                
                <h2 className='budget--total-spent'>Spent: ${spent}</h2>
                <h2 className='budget--total-left'>Left: ${left}</h2>

                <form className='budget--form'>
                    <label>
                        <span>Monthly Budget:</span>
                        <input placeholder='Enter your budget' type='number' name='budget' value={this.state.value} onChange={this.handleChange} />
                    </label>
                </form>

                <p className='budget--percent'>{((this.props.totalSpent / this.state.monthlyBudget)*100).toFixed(2) || 0}% spent</p>
                <div className='budget--graph'>
                    <div></div>
                </div>
                

            </div>
        );
    }
}

export default Budget;