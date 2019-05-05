import React, { Component } from 'react';

import './scrollContainer.scss';

export default class ScrollContainer extends Component {
	constructor(props) {
		super(props);

		this.scroll = this.scroll.bind(this);
	}

	scroll(e, dir) {
		const inner = document.querySelector(".scrollable-elements");
		const totalNumElements = inner.querySelectorAll(".chart").length;
		const direction = dir === 'left' ? 1 : -1;
		const newAmount = calculateTranslationAmount(inner, totalNumElements, direction);

		inner.style.transform = `translateX(${newAmount}px)`;
	}

	render() {
		return (
			<div className='container'>

				<div className='scrollable-elements'>
					{this.props.elements.map((element, index) => {
						return (
							<div key={index} className='wrapper'>
								{element}
							</div>
						);
					})}
				</div>

				<button onClick={(e) => this.scroll(e, 'left')} className='btn btn--left scroll'>Prev</button>
				<button onClick={(e) => this.scroll(e, 'right')} className='btn btn--right scroll'>Next</button>

			</div>
		)
	}
}

function calculateTranslationAmount(element, totalNumElements, direction) {
	const margin = 0; // This should be pulled from the elements style property
	const innerItemWidth = document.querySelector(".chart").offsetWidth + (margin * 2);

	console.log(`innerItemWidth: ${innerItemWidth}`);

	let currentXTranslateAmt;

	try {
		currentXTranslateAmt = parseInt(element.style.transform.split("(")[1].slice(0, -3));
	} catch (err) {
		console.log('err caught');
		console.log(err);
		currentXTranslateAmt = 0;
	}

	console.log(`currentXTranslateAmt: ${currentXTranslateAmt}`);

	const minimumBound = ((totalNumElements * innerItemWidth) - window.innerWidth) * -1;
	const maximumBound = 0;

	let newXTranslateAmt = currentXTranslateAmt + innerItemWidth * direction;

	if (newXTranslateAmt > maximumBound) {
		return maximumBound;
	} else if (newXTranslateAmt < minimumBound) {
		return minimumBound;
	} else {
		return newXTranslateAmt;
	}
}

