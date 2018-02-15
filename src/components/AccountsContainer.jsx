import ReactDOM from "react-dom";
import React, { Component } from "react";
import TransactionContainer from "./TransactionContainer.jsx";
import "../scss/accountsContainer.scss"

import helpers from './helpers';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

class AccountsContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// this state variable is used to keep track of transactions the
			// user wants to see
			categoryTransactions: [],
			// Stores how the user is currently sorting their transactions
			categoryType: "",
			categoryTotal: 0,
			keyWord: "",
			months : ["Jan.", "Feb.", "Mar.", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
		};

		this.getAccountTransactions = this.getAccountTransactions.bind(this);
		this.getCategoryTransactions = this.getCategoryTransactions.bind(this);
		this.getDate = this.getDate.bind(this);
		this.searchByDate = this.searchByDate.bind(this);
        this.searchByKeyword = this.searchByKeyword.bind(this);

        this.showSearch = this.showSearch.bind(this);
        this.getKeyword = this.getKeyword.bind(this);
	}

	getAccountTransactions(account_id) {
		let allTransactions = this.props.transactions;

		let releventTransactions = [];
		let type;
		let total = 0;

		if (account_id === "none") {
			releventTransactions = [];
			type = "";
		} else if (account_id === "all") {
			releventTransactions = allTransactions;
			type = "All Categories";
		} else {
			allTransactions.map( (transaction) => {
				if (transaction.account_id === account_id) {
					releventTransactions.push(transaction);
				}
			});
		}

		releventTransactions.forEach((transaction) => {
			total += transaction.amount;
		});

		total = helpers.formatAmount(total);
		total = helpers.numberWithCommas(total);

		// Update the state with the relevent transactions and how the user is sorting them
		this.props.accounts.forEach(account => {
			if (account.account_id === account_id) {
				type = account.name;
				return;
			}
		});


		if (type === "All Categories") {
			const now = new Date();

			const nowString = this.state.months[now.getMonth() - 1] + "  " + now.getDate() + ".  " + now.getFullYear();
			const prevString = this.state.months[now.getMonth() - 1] + "  " + now.getDate() + ".  " + (now.getFullYear() - 1);
			console.log(prevString);

			this.setState({
				categoryTransactions: releventTransactions,
				categoryType: prevString + " - " + nowString,
				categoryTotal: total
			});
		} else {
			this.setState({
				categoryTransactions: releventTransactions,
				categoryType: type,
				categoryTotal: total
			});

		}


	}

	getCategoryTransactions(categoryString) {
		let releventTransactions = [];

		// Other displays transactions with a category of null
		if (categoryString === "Other") {
			this.props.transactions.forEach(t => {
				if (t.category === null || t.category[0] === "Bank Fees" || t.category[0] === "Cash Advance" || t.category[0] === "Interest" || t.category[0] === "Payment" || t.category[0] === "Tax" || t.category[0] === "Transfer") {
					releventTransactions.push(t);
				}
			});
		} else {
			this.props.transactions.forEach(t => {
				if (t.category !== null && t.category[0] === categoryString) {
					releventTransactions.push(t);
				}
			});
		}

		// Get the total spent for the current Category
		let total = 0;
		releventTransactions.forEach((transaction) => {
			total += transaction.amount;
		});

		total = helpers.formatAmount(total);
		total = helpers.numberWithCommas(total);

		// Update the state with the relevent transactions and how the user is sorting them
		this.setState({
			categoryTransactions: releventTransactions,
			categoryType: categoryString,
			categoryTotal: total
		});
	}

	getDate(e, val) {
		this.setState({ [val]: e.target.value });
	}

	async searchByDate(e) {
		// TODO: Need additional validation if using forms to get data
		// Ensure month is between 1 and 12
		// Ensure the day given is between 1 - 30, 1 -31, 1 - 28 or 1 - 29 based on the month and year
		// Don't allow a range greater than 5 years or some other arbitrary amount

		e.preventDefault();
		let dateOne = new Date(this.state.yearOne, this.state.monthOne - 1, this.state.dayOne);
		let dateTwo = new Date(this.state.yearTwo, this.state.monthTwo - 1, this.state.dayTwo);
		let releventTransactions = [];
		let total = 0;
		let fetchOptions = {
			method: 'post',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				startDate: dateOne,
				endDate: dateTwo
			})
		};

		try {

			let data = await fetch('/plaid-api/transactions', fetchOptions);
			data = await data.json();

			data.forEach(acct => {
				acct.transactions.forEach(transaction => {
					releventTransactions.push(transaction);
					total += transaction.amount;
				});
			});

			total = helpers.formatAmount(total);
			total = helpers.numberWithCommas(total);

			this.setState({
				categoryTransactions: releventTransactions,
				categoryType: `${this.state.months[dateOne.getMonth()]} ${dateOne.getDate()} - ${this.state.months[dateTwo.getMonth()]} ${dateTwo.getDate()}`,
				categoryTotal: total
			});
		} catch (err) {
			console.error(err);
		}
    }

	async searchByKeyword(e) {
        console.log("SEARCHING...");
        e.preventDefault();
        let releventTransactions = [];
        const keyWord = this.state.keyWord || "Everything";

        const normalizedKeyWord = keyWord.toLowerCase();
        console.log(normalizedKeyWord);

        let total = 0;
        this.props.transactions.forEach(t => {
            let normalizedTransactionName = t.name.toLowerCase();

            if (normalizedTransactionName.includes(normalizedKeyWord)) {
                console.log("FOUND")
                total += t.amount;
                releventTransactions.push(t);
            }
        });
        console.log(releventTransactions);

        total = helpers.formatAmount(total);
        total = helpers.numberWithCommas(total);

        this.setState({
            categoryType: keyWord,
            categoryTransactions: releventTransactions,
            categoryTotal: total
        });

	}

	showSearch(e) {
        const elem = document.querySelector(".accounts--search-options--keyword-search");
        elem.classList.toggle("accounts--search-options--keyword-search__active");
    }

    getKeyword(e) {
        e.preventDefault();

        let keyWord = e.target.value.trim() // helpers.toTitleCase(e.target.value);

        console.log(keyWord);

        this.setState({
            keyWord: keyWord
        });
    }

	render() {

		return (
			<div className="accounts">

			<div className="accounts--search-options">

                <div className="accounts--search-options--keyword-search">
                    <FontAwesomeIcon className="icon" onClick={(e) => { this.showSearch(e) }} icon={faSearch} />

                    <form onSubmit={this.searchByKeyword}>
                        <label>
                            <input type="text" placeholder="Search by transaction name" value={this.state.keyWord} onChange={(e) => { this.getKeyword(e) }} />
                        </label>
                    </form>
                </div>

                <form className="accounts--search-options--date-picker" onSubmit={this.searchByDate}>
					<div>
						<p>Begin Date</p>
						<label>Month
						<input type="text" vale={this.state.monthOne} onChange={(e) => { this.getDate(e, 'monthOne') }} />
						</label>

						<label>Day
						<input type="text" vale={this.state.dayOne} onChange={(e) => { this.getDate(e, 'dayOne') }} />
						</label>

						<label>Year
						<input type="text" vale={this.state.yearOne} onChange={(e) => { this.getDate(e, 'yearOne') }} />
						</label>
					</div>

					<div>
						<p>End Date</p>
						<label>Month
						<input type="text" vale={this.state.monthTwo} onChange={(e) => { this.getDate(e, 'monthTwo') }} />
						</label>

						<label>Day
						<input type="text" vale={this.state.dayTwo} onChange={(e) => { this.getDate(e, 'dayTwo') }} />
						</label>

						<label>Year
						<input type="text" vale={this.state.YearTwo} onChange={(e) => { this.getDate(e, 'yearTwo') }} />
						</label>
					</div>

					<br />
					<input type="submit" value="Submit" />
				</form>

			</div>

				<h3 className="accounts--sort-options" >Sort by Account Type</h3>
				<div className="accounts--btns">
					{/* Show All Transactions */}
					<button onClick={() => { this.getAccountTransactions("all")}}>All Transactions</button>

					{/* Generate a button for each type of account connected */}
					{this.props.accounts.map( (a, index) =>
					<button key={index} onClick={() => { this.getAccountTransactions(a.account_id)}}>{a.name}</button>
					)}

					{/* Hide All Transactions */}
					<button onClick={() => { this.getAccountTransactions("none")}}>Hide Transactions</button>
				</div>

				<h3 className="accounts--sort-options">Sort by Categories</h3>
				<div className="accounts--btns">
					<button onClick={() => { this.getCategoryTransactions("Food and Drink") }}>Food and Drink</button>
					<button onClick={() => { this.getCategoryTransactions("Travel") }}>Travel</button>
					<button onClick={() => { this.getCategoryTransactions("Shops") }}>Shops</button>
					<button onClick={() => { this.getCategoryTransactions("Recreation") }}>Recreation</button>
					<button onClick={() => { this.getCategoryTransactions("Service") }}>Service</button>
					<button onClick={() => { this.getCategoryTransactions("Community") }}>Community</button>
					<button onClick={() => { this.getCategoryTransactions("Healthcare") }}>Healthcare</button>
					<button onClick={() => { this.getCategoryTransactions("Other") }}>Other</button>
				</div>

				<h2 className="accounts--totals">Total spent on {this.state.categoryType}</h2>
				<h2 className="accounts--totals">${this.state.categoryTotal}</h2>

				<TransactionContainer transactions={this.state.categoryTransactions} />
			</div>
		);
	}
}

export default AccountsContainer;
