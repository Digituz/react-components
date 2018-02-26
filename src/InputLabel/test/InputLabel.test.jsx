import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import InputLabel from '../src/InputLabel';

describe('InputLabel Test Suite', function() {
  it('should render without throwing an error', function() {
    const label = 'Family Name';
    const defaultClass = 'digituz-react-input-label';
    const self = this;
    self.inputValue = 'oi';

    const wrapper = mount(
      <InputLabel
        onChange={(newValue) => { self.inputValue = newValue}}
        label={label}
        value={self.inputValue}
        inputId="some-id"
      />
    );
    expect(wrapper.text()).toEqual(label);
    expect(wrapper.find('div').hasClass(defaultClass)).toEqual(true);
  });

  it('should enable devs to change className', function() {
    const className = 'some-nice-class';
    const label = 'Email Address';
    const self = this;
    self.inputValue = 'someone@somewhere.com';

    const wrapper = mount(
      <InputLabel
        onChange={(newValue) => { self.inputValue = newValue}}
        label={label}
        value={self.inputValue}
        inputId="some-id"
        className={className}
      />
    );
    expect(wrapper.text()).toEqual(label);
    expect(wrapper.find('div').hasClass(className)).toEqual(true);
  });
});
