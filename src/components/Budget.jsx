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
        this.setState({ monthlyBudget: event.target.value });
        const graph = document.querySelector('.budget--graph > div');

        let percentage = (this.props.totalSpent / event.target.value) * 100;

        graph.style.width = percentage + "%";
    }

    render() {

        return (
            <div className='budget'>
                
                <h2>Total Spent: {this.props.totalSpent}</h2>
                <form className='budget--form'>
                    <label>
                        Monthly Budget:
                        <input placeholder='Enter your budget' type='number' name='name' value={this.state.value} onChange={this.handleChange} />
                    </label>
                </form>

                <div className='budget--graph'>
                    <div></div>
                </div>
                
                <p>{(this.props.totalSpent / this.state.monthlyBudget)*100 || 0}%</p>

            </div>
        );
    }
}

export default Budget;