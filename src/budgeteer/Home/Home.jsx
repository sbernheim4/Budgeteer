import React, { Component } from "react";

import './home.scss';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {

		let text;

		if (this.props.loading) {
			text = <div className="home--loading"><h1>Loading...</h1><img src='./loading-gifs/loading-one.gif' alt='loading' /></div>
		} else {
			text = "";
		}

		return (
			<div className="home">
				{text}

				<section className="home--info">
					<h1>Welcome to Budgeteer</h1>

					<div className="home--info--details">

					</div>

				</section>
			</div>
		);
	}
}

export default Home;

/*
	<p>We know your financial information is incredibly sensative and that linking your accounts can be a little nerve racking so here's some information that we hope makes you feel more comfortable.</p>

	<ol>
		<li>We use the same API as Venmo and StripeJS to let users link accounts which means its incredibly secure.</li>
		<li>All information that passes between our servers is encrypted.</li>
		<li>Your bank credentials are never stored in our database. Instead we store access tokens which allow us to retrieve information without ever having to ask for your username and password after you link an account.</li>
		<li>If you ever feel uncomfortable having a linked account, we make it very easy to unlink an account or to rotate the access tokens we store to get your account information.</li>
	</ol>
*/
