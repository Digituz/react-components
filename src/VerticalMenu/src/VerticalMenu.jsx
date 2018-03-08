import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'VerticalMenu.css';

class VerticalMenu extends Component {
  render() {
    const classes = `digituz-react-vertical-menu ${this.props.className}`;
    return (
      <div className={classes}></div>
    );
  }
}

VerticalMenu.propTypes = {
  className: PropTypes.string,
};

VerticalMenu.defaultProps = {
  className: '',
};

export default VerticalMenu;
