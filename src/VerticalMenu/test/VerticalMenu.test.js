import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import VerticalMenu from '../src/VerticalMenu';

describe('VerticalMenu test suite', function() {
  it('should render without throwing an error', function() {
    const defaultClass = 'digituz-react-vertical-menu';
    const customClass = 'some-custom-class-for-vertical-menu';

    const wrapper = mount(<VerticalMenu className={customClass}/>);
    expect(wrapper.find(`.${defaultClass}`)).toBeDefined();
    expect(wrapper.find(`.${customClass}`)).toBeDefined();
  });
});
