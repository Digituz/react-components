import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Header from '../src/Header';

describe('Header test suite', function() {
  it('should render without throwing an error', function() {
    const title = 'Some value!';
    const defaultClass = 'digituz-react-header';

    const wrapper = mount(<Header title={title} />);
    const div = wrapper.find(`.${defaultClass}`);
    const header = div.find('h1');
    expect(header.text()).toEqual(title);
  });

  it('should enable devs to change className', function() {
    const title = 'Other value.';
    const otherClass = 'some-crazy-class';

    const wrapper = mount(<Header title={title} className={otherClass} />);
    const div = wrapper.find(`.${otherClass}`);
    const header = div.find('h1');
    expect(header.text()).toEqual(title);
  });
});
