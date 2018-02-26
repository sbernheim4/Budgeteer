import React, { Component } from "react";
import Transaction from "./Transaction.jsx"

import "../scss/transactionContainer.scss"

class TransactionContainer extends Component {
	constructor(props) {
        super(props)

        let initialNum = this.props.transactions.length < 10 ? this.props.transactions.length : 10

        this.state = {
            num: initialNum,
            transactionsToDisplay: this.props.transactions.slice(0, initialNum)
        };

        this.showMoreItems = this.showMoreItems.bind(this);
    }

    showMoreItems() {

        if (this.state.num + 10 > this.props.transactions.length) {
            this.setState({
                transactionsToDisplay: this.props.transactions,
                num: this.props.transactions.length
            })

            // If all transactions are shown, remove the button
            document.querySelector("button").remove();
        } else {
            this.setState({
                transactionsToDisplay: this.props.transactions.slice(0, this.state.num + 10),
                num: this.state.num + 10
            });
        }

    }

	render() {
		return (
			<div className="transaction-container">
                {this.state.transactionsToDisplay.map( (t, index) => {
                    return <Transaction key={index} transaction={t} />
                })}

                <button onClick={this.showMoreItems}>Show More</button>
			</div>

		);
	}
}

export default TransactionContainer;
