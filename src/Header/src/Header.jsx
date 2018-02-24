import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const className = this.props.className || 'digituz-header';
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  className: '',
};

export default Header;
