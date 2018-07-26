/* eslint no-undefined: 0 */
import React, { Component } from "react";
import GoogleMap from "./GoogleMap/GoogleMap.jsx";

import "./heatmap.scss";


class HeatMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: {},
			heatmap: {}
		}
	}

	componentDidMount() {
		console.log("Heat map loaded");

	}

	render() {
		return (
			<div className="heatmap">

				<GoogleMap />

			</div>
		)
	}

}

export default HeatMap;
