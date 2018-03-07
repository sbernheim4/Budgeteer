import React, { Component } from "react";
import helpers from "./helpers.js";

import '../scss/networth.scss';

class Networth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			total: 0,
			recurringPayments: new Set()
		}
	}

	componentWillReceiveProps(nextProps) {
		let acctTotal = 0;

		Object.entries(nextProps.netWorth).forEach( key => {
			acctTotal += key[1]
		});

		this.setState({total: acctTotal})
	}

	componentDidMount() {
		let acctTotal = 0;

		Object.entries(this.props.netWorth).forEach( key => {
			acctTotal += key[1]
		});

		this.setState({total: acctTotal})
	}

	render () {
		return (
			<div className='networth'>
				<table>
					<thead>
						<tr>
							<th>Account Name</th>
							<th>Amount</th>
						</tr>
					</thead>

					<tbody>
						{Object.keys(this.props.netWorth).map( (keyName, index) => (
						<tr key={index} className='networth--entry'>
							<td className='acct-name'>{keyName}</td>
							<td className='acct-value'>${helpers.numberWithCommas(this.props.netWorth[keyName])}</td>
						</tr>
						))}

						<tr>
							<td className='acct-name'>Total</td>
							<td className='acct-value'>${this.state.total}</td>
						</tr>
					</tbody>
				</table>

				<div>
					<h2>Recurring Payments</h2>
				</div>
			</div>
		)
	}
}

export default Networth
