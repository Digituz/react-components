import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Input from '../src/Input';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    const wrapper = mount(<Input onChange={() => {}} value={'Some value!'}/>);
    const input = wrapper.find('input');
    expect(input.get(0).props.value).toEqual('Some value!');
  });
});
