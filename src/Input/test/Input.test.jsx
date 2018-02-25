import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Input from '../src/Input';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    const inputValue = 'Some value!';
    const defaultClass = 'digituz-react-input';

    const wrapper = mount(<Input onChange={() => {}} value={inputValue}/>);
    const input = wrapper.find('input');
    expect(input.get(0).props.value).toEqual(inputValue);
    expect(wrapper.find('input').hasClass(defaultClass)).toEqual(true);
  });

  it('should enable devs to set id', function() {
    const inputValue = 'Some other value!';
    const someId = 'random-id';

    const wrapper = mount(<Input onChange={() => {}} id={someId} value={inputValue} />);
    const input = wrapper.find(`input#${someId}`);
    expect(input.get(0).props.value).toEqual(inputValue);
  });

  it('should enable devs to change className', function() {
    const inputValue = 'Some other value!';
    const someClass = 'some-class-4-input';

    const wrapper = mount(<Input onChange={() => {}} className={someClass} value={inputValue}/>);
    const input = wrapper.find('input');
    expect(input.get(0).props.value).toEqual(inputValue);
    expect(wrapper.find('input').hasClass(someClass)).toEqual(true);
  });
});
