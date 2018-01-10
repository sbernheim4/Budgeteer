import React, { Component } from "react";

class Networth extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <p>Net Worth {this.props.netWorth}</p>;
    }
}

export default Networth
