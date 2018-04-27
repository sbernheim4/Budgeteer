import React, { Component } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Legend, Label, Tooltip, text, tspan} from "recharts"
import subMonths from 'date-fns/sub_months';
import isWithinRange from 'date-fns/is_within_range';

import helpers from '../helpers';

import "../scss/categoryCharts.scss";

const COLORS = [
	"#578CA9",
	"#F6D155",
	"#004B8D",
	"#F2552C",
	"#95DEE3",
	"#CE3175",
	"#5A7247",
	"#CFB095",
	"#578CA9",
	"#f4d942",
	"#afc47d",
	"#558244",
	"#347759",
	"#2d7582"
]

class CustomTooltip extends Component {

	render() {
		const { active } = this.props;

		if (active) {
			const { payload, label } = this.props;

			const style = {
				background: `${payload[0].payload.fill}`,
				color: "#fff"
			}

			let value = helpers.formatAmount(payload[0].value);
			value = helpers.numberWithCommas(value);

			return (
				<div style={style} className="custom-tooltip">
					<p className="label">{`${payload[0].name}:\n $${value}`}</p>
				</div>
			);
		}

		return null;
	}
};

class CategoryChart extends Component {

	constructor(props) {
		super(props);

		this.state = {
			categoryDoughnutData: [],
			labelText: "",
			totalSpent: 0
		}
	}

	componentDidMount() {
		this.generateDoughnutChart();
	}

	componentWillReceiveProps() {
		this.generateDoughnutChart();
	}

	generateDoughnutChart() {
		// Initialize a new array of size 8 and fill it with 0s initially
		let amts = [
			{name: 'Food and Drink', value: 0},
			{name: 'Travel', value: 0},
			{name: 'Shops', value: 0},
			{name: 'Service', value: 0},
			{name: 'Community', value: 0},
			{name: 'Healthcare', value: 0},
			{name: 'Bank Fees', value: 0},
			{name: 'Cash Advance', value: 0},
			{name: 'Interest', value: 0},
			{name: 'Payment', value: 0},
			{name: 'Tax', value: 0},
			{name: 'Transfer', value: 0},
			{name: 'Other', value: 0}
		];

		const now = new Date();
		const oneMonthAgo = subMonths(now, 1);

		this.props.transactions.forEach(t => {
			let transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

			if (isWithinRange(transactionDate, oneMonthAgo, now)) {
				let category = (t.category || [""])[0];
				let amount = t.amount;
				// TODO: Try cleaning up the switch statements to something like this
				// amts[t.category] += t.amount;

				switch (category) {
					case "Food and Drink":
						amts[0].value += amount;
						break;
					case "Travel":
						amts[1].value += amount;
						break;
					case "Shops":
						amts[2].value += amount;
						break;
					case "Recreation":
						amts[3].value += amount;
						break;
					case "Service":
						amts[4].value += amount;
						break;
					case "Community":
						amts[5].value += amount;
						break;
					case "Healthcare":
						amts[6].value += amount;
						break;
					case "Bank Fees":
						amts[7].value += amount;
						break;
					case "Cash Advance":
						amts[8].value += amount;
						break;
					case "Interest":
						amts[9].value += amount;
						break;
					case "Payment":
						amts[10].value += amount;
						break;
					case "Tax":
						amts[11].value += amount;
						break;
					case "Transfer":
						amts[12].value += amount;
						break;
					default:
						amts[13].value += amount
				}
			}
		});

		let newAmts = [];
		let total = 0;

		amts.forEach( (entry, index) => {
			if (entry.value !== 0) {
				newAmts.push({
					name: entry.name,
					value: entry.value
				});

				total += entry.value;
			}
		});

		this.setState({
			categoryDoughnutData: newAmts,
			totalSpent: helpers.formatAmount(total)
		});
	}

	changeCenterText(a) {
		const amount = helpers.numberWithCommas(helpers.formatAmount(a.value));
		this.setState({
			labelText: a.name + ": $" + amount
		})
	}

	render() {

		return (

			<ResponsiveContainer className="category-chart" width="100%" height={500} >
				<PieChart>
					<Pie
						data={this.state.categoryDoughnutData}
						cy={250}
						innerRadius="70%"
						outerRadius="90%"
						fill="#8884d8"
						paddingAngle={2}>
						{/*onMouseOver={(a) => this.changeCenterText(a)}>*/}
					{/*{label={(name) =>`$${helpers.formatAmount(name.value)}`}}*/}

						{
							this.state.categoryDoughnutData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
						}

						<Label className="center-label" fill={"white"} value={"Total Spent: $" + this.state.totalSpent} position="center" />
					</Pie>

					<Tooltip content={<CustomTooltip/>}/>
					{/*<Legend align="center" verticalAlign="bottom"/>*/}
				</PieChart>
			</ResponsiveContainer>

		)
	}
}

export default CategoryChart;
