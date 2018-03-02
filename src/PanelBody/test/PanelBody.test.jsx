import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import PanelBody from '../src/PanelBody';

describe('PanelBody test suite', function() {
  it('should render without throwing an error', function() {
    const defaultClass = 'digituz-react-panel-body';
    const title = 'Good to Go!';

    const wrapper = mount(
      <PanelBody>
        <h2>{title}</h2>
        <hr />
      </PanelBody>
    );
    const div = wrapper.find(`.${defaultClass}`);
    const header = div.find('h2');
    expect(header.text()).toEqual(title);

    expect(div.find('hr')).toBeDefined();
  });
});
