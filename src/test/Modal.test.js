import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Modal from '../Modal/Modal';

describe('Modal test suite', function() {
  it('should render without throwing an error', function() {
    const defaultClass = 'digituz-react-modal';
    const customClass = 'some-custom-class-for-modal';

    const wrapper = mount(<Modal className={customClass}/>);
    expect(wrapper.find(`.${defaultClass}`)).toBeDefined();
    expect(wrapper.find(`.${customClass}`)).toBeDefined();
  });
});
