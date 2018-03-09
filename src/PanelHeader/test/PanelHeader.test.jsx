import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import PanelHeader from '../src/PanelHeader';

describe('Header test suite', function() {
  it('should render without throwing an error', function() {
    const title = 'Some value!';
    const defaultClass = 'digituz-react-panel-header';

    const wrapper = mount(
      <PanelHeader>
        <h1>{title}</h1>
      </PanelHeader>
    );
    const div = wrapper.find(`.${defaultClass}`);
    const header = div.find('h1');
    expect(header.text()).toEqual(title);
  });
});
