import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import VerticalMenu from '../VerticalMenu/VerticalMenu';

describe('VerticalMenu test suite', () => {
  it('should render without throwing an error', function() {
    const defaultClass = 'digituz-react-vertical-menu';
    const customClass = 'some-custom-class-for-vertical-menu';

    const wrapper = mount(<VerticalMenu submenus={[]} className={customClass}/>);
    expect(wrapper.find(`.${defaultClass}`)).toBeDefined();
    expect(wrapper.find(`.${customClass}`)).toBeDefined();
  });

  it('should render submenus', () => {
    const submenus = [{
      title: 'My First Submenu',
      items: [
        { title: 'Item One', color: 'gray', onClick: () => {} },
        { title: 'Item Two', color: 'green', onClick: () => {} },
        { title: 'Item Three', color: 'yellow', onClick: () => {} }
      ]
    }];

    const wrapper = mount(<VerticalMenu submenus={submenus} />);
    const firstMenu = wrapper.find('div.menu-options-container > div');

    const firstMenuTitle = firstMenu.find('h3');
    expect(firstMenuTitle.text()).toEqual('My First Submenu');

    const firstItem = firstMenu.find('ul > li').at(0);
    expect(firstItem.text()).toEqual('Item One');

    const secondItem = firstMenu.find('ul > li').at(1);
    expect(secondItem.text()).toEqual('Item Two');

    const thirdItem = firstMenu.find('ul > li').at(2);
    expect(thirdItem.text()).toEqual('Item Three');
  });

  it('it should switch between open and closed', () => {
    const wrapper = mount(<VerticalMenu submenus={[]} />);
    const openButton = wrapper.find('div.digituz-react-vertical-menu-container > div').at(0);

    expect(wrapper.find('div.digituz-react-vertical-menu-overlay').exists()).toBe(false);
    openButton.simulate('click');
    const overlay = wrapper.find('div.digituz-react-vertical-menu-overlay');
    expect(overlay.exists()).toBe(true);

    overlay.simulate('click');
    expect(wrapper.find('div.digituz-react-vertical-menu-overlay').exists()).toBe(false);
  });
});
