import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Input from '../src/Input';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    const inputValue = 'Some value!';
    const defaultClass = 'digituz-react-input-test';

    const wrapper = mount(<Input onChange={() => {}} value={inputValue}/>);
    const input = wrapper.find('input');
    expect(input.get(0).props.value).toEqual(inputValue);
    expect(wrapper.find('input').hasClass(defaultClass)).toEqual(true);
  });

  it('should enable devs to change className', function() {
    const inputValue = 'Some other value!';
    const someClass = 'digituz-react-input';

    const wrapper = mount(<Input onChange={() => {}} className={someClass} value={inputValue}/>);
    const input = wrapper.find('input');
    expect(input.get(0).props.value).toEqual(inputValue);
    expect(wrapper.find('input').hasClass(someClass)).toEqual(true);
  });
});
