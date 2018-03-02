import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Panel from '../src/Panel';

describe('Panel Test Suite', function() {
  it('should render without throwing an error', function() {
    const title = 'This is the panel header';
    const paragraph = 'This is some paragraph';

    const wrapper = mount(
      <Panel>
        <p>{paragraph}</p>
      </Panel>
    );
    expect(wrapper.find('p').text()).toEqual(paragraph);
  });
});
