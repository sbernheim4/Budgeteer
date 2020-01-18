import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import store from './../../../../../__mocks__/mockReduxStore';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InstitutionCard from './../../../../budgeteer/Savings/SavingsTable/InstitutionCard/InstitutionCard';
import { determineNewWidth } from './../../../../budgeteer/Savings/SavingsTable/InstitutionCard/helpers';

configure({ adapter: new Adapter() });

describe('InstitutionCard Component', () => {


	const props = {
		institutionInfo: {
			accountId: 'accountId'
		},
		institutionNames: new Map().set('1', 'My Custom Bank Name'),
		institutionId: '1'
	}

	let wrapper = mount(<Provider store={store}> <InstitutionCard {...props}/> </Provider>);

	describe('component', () => {

		it('should render the same as always', () => {

			expect(wrapper).toMatchSnapshot();

		});

		it('should apply toggle the css class when clicked, and remove it when clicked again', () => {

			expect(wrapper.html().includes('show')).toBe(false);
			wrapper.find('div.institution-card--info').simulate('click');
			expect(wrapper.html().includes('savings-chart--show')).toBe(true);

			wrapper.find('div.institution-card--info').simulate('click');
			expect(wrapper.html().includes('savings-chart--show')).toBe(false);

		});

	});

	describe('helpers', () => {

		describe('#determineNewWidth', () => {

			const info = wrapper.find('.institution-card--info--name');
			const newWidth = determineNewWidth(info);
			expect(newWidth).toBe(0);

		});

	});

});

