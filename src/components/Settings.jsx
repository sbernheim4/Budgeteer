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
        }
    }

    componentDidMount() {
        console.log(this.props.accounts);
    }

    removeAccount() {
        console.log("account removed");
    }


    render() {
        return (

            <section className='settings'>
                <h1> Linked Accounts </h1>
                {this.props.accounts.map( (a, index) =>
                    <div className='settings--linked-accounts'>
                        <h2 key={index}>{a.name}</h2>
                        <FontAwesomeIcon className='icon' icon={faTimes} onClick={this.removeAccount}/>
                    </div>
                )}
            </section>
        );
    }
}

export default Settings;
