import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Button from '../src/Button';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    const buttonLabel = 'Hello, world!';
    const defaultClass = 'digituz-react-button-test1';

    const wrapper = mount(<Button onClick={() => {}} text={buttonLabel} />);
    expect(wrapper.text()).toEqual(buttonLabel);
    expect(wrapper.find('button').hasClass(defaultClass)).toEqual(true);
  });

  it('should enable devs to change className', function() {
    const className = 'some-nice-class';
    const buttonLabel = 'Look, here I am!';

    const wrapper = mount(<Button onClick={() => {}} className={className} text={buttonLabel} />);
    expect(wrapper.text()).toEqual(buttonLabel);
    expect(wrapper.find('button').hasClass(className)).toEqual(true);
  });
});
