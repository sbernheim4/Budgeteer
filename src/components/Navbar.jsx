import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "../scss/navbar.scss";

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            handler: {}
        }

        this.addAccount = this.addAccount.bind(this);
    }

    async componentDidMount() {

        let keyAndEnv = await fetch('plaid-api/key-and-env');
        keyAndEnv = await keyAndEnv.json();

        const plaid = Plaid.create({
            apiVersion: 'v2',
            clientName: 'Plaid Walkthrough Demo',
            env: keyAndEnv.env,
            product: ['transactions'],
            key: keyAndEnv.publicKey,
            onSuccess: function (public_token) {
                fetch('/plaid-api/get-access-token', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        public_token: public_token,
                        client_id: '5a24ca6a4e95b836d37e37fe',
                        secret: 'f07a761a591de3cbbc5ac3ba2f4301'
                    })
                });
            }
        });

        this.setState({ handler: plaid });
    }

    addAccount() {
        this.state.handler.open();
    }

    render() {
		return (
			<nav className='navbar'>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/accounts'>Accounts</Link></li>
					<li><Link to='/statistics'>Statistics</Link></li>
					<li><Link to='/networth'>Networth</Link></li>
				</ul>

                <div>
                    <button onClick={this.addAccount}>Add Accounts</button>
                </div>
			</nav>
		);
	}
}

export default Navbar;
