import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const className = this.props.className || 'digituz-react-header';
    return (
      <div className={className}>
        <div>
          <h1>{this.props.title}</h1>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
