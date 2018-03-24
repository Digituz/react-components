import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

class Input extends Component {
  render() {
    const className = 'digituz-react-input ' + this.props.className;
    return (
      <input
        id={this.props.id}
        className={className}
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  className: '',
  placeholder: '',
};

export default Input;
