import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import If from '../src/If';

describe('If test suite', function() {
  it('should conditionally render elements', function() {
    const trueWrapper = mount(
      <If condition={true}>
        <h1>Title</h1>
      </If>
    );
    expect(trueWrapper.contains(<h1>Title</h1>)).toBe(true);

    const falseWrapper = mount(
      <If condition={false}>
        <h1>Title</h1>
      </If>
    );
    expect(falseWrapper.contains(<h1>Title</h1>)).toBe(false);

    falseWrapper.setProps({ condition: true });
    expect(falseWrapper.contains(<h1>Title</h1>)).toBe(true);
  });
});
