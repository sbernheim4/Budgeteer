import React, { Component } from "react";

import '../scss/settings.scss';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faTimes
} from '@fortawesome/fontawesome-free-solid';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            linkedBanks: []
        }
    }

    async componentDidMount() {
        let linkedBanks = await fetch("/plaid-api/linked-accounts", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        linkedBanks = await linkedBanks.json();
        this.setState({
            linkedBanks: linkedBanks.accounts
        })
    }

    removeAccount() {
        console.log("account removed");
    }


    render() {
        return (

            <section className='settings'>
                <h1> Linked Accounts </h1>
                {this.state.linkedBanks.map( (bank, index) =>
                    <div key={index} className='settings--linked-accounts'>
                        <h2 key={index}>{bank}</h2>
                        <button onClick={this.removeAccount}>Remove Account</button>
                        {/*<FontAwesomeIcon className='icon' icon={faTimes} onClick={this.removeAccount}/>*/}
                    </div>
                )}
            </section>
        );
    }
}

export default Settings;
