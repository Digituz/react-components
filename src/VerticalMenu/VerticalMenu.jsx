import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from '../If/If';
import './VerticalMenu.scss';

class VerticalMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  closeMenu() {
    this.setState({
      visible: false,
    });
  }

  openMenu() {
    this.setState({
      visible: true,
    });
  }

  render() {
    let classes = `digituz-react-vertical-menu ${this.props.className}`;
    if (this.state.visible) classes += ' state-visible';

    return (
      <div className="digituz-react-vertical-menu-container">
        <div onClick={() => { this.openMenu() }}>
          <svg className="menu-svg-button">
            <line x1="13" y1="15" x2="27" y2="15" stroke="gray" strokeWidth="2" />
            <line x1="13" y1="20" x2="27" y2="20" stroke="gray" strokeWidth="2" />
            <line x1="13" y1="25" x2="27" y2="25" stroke="gray" strokeWidth="2" />
          </svg>
        </div>
        <If condition={this.state.visible}>
          <div onClick={() => { this.closeMenu() }} className="digituz-react-vertical-menu-overlay" />
        </If>
        <div className={classes}>
          <div className="menu-options-container">
            <svg onClick={() => { this.closeMenu() }} className="menu-svg-button close-menu">
              <line x1="11" y1="20" x2="20" y2="12" stroke="gray" strokeWidth="2" />
              <line x1="10" y1="20" x2="30" y2="20" stroke="gray" strokeWidth="2" />
              <line x1="11" y1="20" x2="20" y2="28" stroke="gray" strokeWidth="2" />
            </svg>
            {
              this.props.submenus.map((submenu, idx) => (
                <div key={idx}>
                  <h3>{submenu.title}</h3>
                  <ul>
                    {
                      submenu.items.map((item, idx) => (
                        <li onClick={item.onClick} key={idx}>
                          <svg height="10" width="20">
                            <circle cx="5" cy="5" r="5" fill={item.color} />
                          </svg>
                          { item.title }
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
          <p className="powered-by-digituz">Powered by Digituz</p>
        </div>
      </div>
    );
  }
}

VerticalMenu.propTypes = {
  className: PropTypes.string,
  submenus: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })),
  })),
};

VerticalMenu.defaultProps = {
  className: '',
};

export default VerticalMenu;
