import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Button from '../src/Button';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    const wrapper = mount(<Button onClick={() => {}} text={'Hello, world!'} />);
    expect(wrapper.text()).toEqual('Hello, world!');
  });
});
