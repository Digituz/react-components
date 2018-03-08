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

  it('should enable devs to add classes', function() {
    const defaultClass = 'digituz-react-card';
    const customClass = 'i-like-pies';
    const title = 'I like pies!';

    const wrapper = mount(
      <Card className={customClass}>
        <p>{title}</p>
        <div><hr /></div>
      </Card>
    );
    const div = wrapper.find(`div.${defaultClass}`);
    const header = div.find('p');
    expect(header.text()).toEqual(title);
    expect(div.hasClass(defaultClass)).toEqual(true);
    expect(div.hasClass(customClass)).toEqual(true);
    expect(div.find('hr')).toBeDefined();

    const sameDiv = wrapper.find(`div.${customClass}`);
    console.log(wrapper.debug());
    expect(sameDiv.hasClass(defaultClass)).toEqual(true);
    expect(sameDiv.hasClass(customClass)).toEqual(true);
    expect(sameDiv.find('hr')).toBeDefined();
  });
});
