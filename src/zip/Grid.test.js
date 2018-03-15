import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import Grid from '../Grid/Grid';

describe('Grid test suite', function() {
  it('should render without throwing an error', function() {
    const wrapper = mount(
      <Grid>
        <h1>Hi there</h1>
        <p>Hello, friend.</p>
      </Grid>
    );
    const title = wrapper.find('h1').at(0);
    expect(title.text()).toEqual('Hi there');

    const paragraph = wrapper.find('p').at(0);
    expect(paragraph.text()).toEqual('Hello, friend.');
  });
});
