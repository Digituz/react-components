import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {maskCurrency} from 'mask-js';
import './Input.scss';

class Input extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if (this.props.type === 'currency') {
      event.target.value = maskCurrency(event.target.value);
    }
    this.props.onChange(event);
  }

  render() {
    const className = 'digituz-react-input ' + this.props.className;
    return (
      <input
        id={this.props.id}
        className={className}
        value={this.props.value}
        onChange={this.onChange}
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
  type: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  className: '',
  placeholder: '',
  type: 'text',
};

export default Input;
