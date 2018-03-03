import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Card from '../src/Card';

describe('Card test suite', function() {
  it('should render without throwing an error', function() {
    const defaultClass = 'digituz-react-card';
    const title = 'Some paragraph content...';

    const wrapper = mount(
      <Card>
        <p>{title}</p>
        <div><hr /></div>
      </Card>
    );
    const div = wrapper.find(`.${defaultClass}`);
    const header = div.find('p');
    expect(header.text()).toEqual(title);

    expect(div.find('hr')).toBeDefined();
  });
});
