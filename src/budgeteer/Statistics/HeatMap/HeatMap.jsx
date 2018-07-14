/* eslint no-undefined: 0 */
import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import "./heatmap.scss";

const MyMapComponent = withGoogleMap((props) =>
	<GoogleMap
		defaultZoom={8}
		defaultCenter={{ lat: -34.397, lng: 150.644 }}
	>
		{props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
	</GoogleMap>
);

class HeatMap extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			map: {},
			heatmap: {} 
		}
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="heatmap">

				<div id="floating-panel">
					{/*<button onClick={this.changeGradient()}>Change gradient</button>*/}
					{/*<button onClick={this.changeRadius()}>Change radius</button>*/}
				</div>

				<div id="map"></div>

					<MyMapComponent isMarkerShown />// Map with a Marker
					<MyMapComponent isMarkerShown={false} />// Just only Map

			</div>
		)
	}

}

export default HeatMap;
