import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

class Button extends Component {
  render() {
    const className = 'drc-button ' + this.props.className;
    return (
      <button
        className={className}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
