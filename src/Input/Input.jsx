import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {maskJs, maskCurrency} from 'mask-js';
import './Input.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: this.valueToString(this.props.value),
    }
  }

  static dateToString(date) {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [
      (dd > 9 ? '' : '0') + dd,
      (mm > 9 ? '' : '0') + mm,
      date.getFullYear(),
    ].join('/');
  };

  valueToString(value) {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      return value + '';
    }
    if (this.props.type === 'date' && typeof value === 'object') {
      return Input.dateToString(value);
    }
  }

  static valueToDate(value) {
    const newDate = new Date(`${value.substring(6, 10)}-${value.substring(3, 5)}-${value.substring(0, 2)}`);
    if (isNaN(newDate.getTime())) {
      return null;
    }
    return newDate;
  }

  onChange(event) {
    let value = event.target.value;

    if (this.props.type === 'currency') {
      value = maskCurrency(value);
    }

    if (this.props.type === 'date') {
      value = maskJs('99/99/9999', value);
    }

    this.setState({
      value,
    });
  }

  onBlur() {
    let value = this.state.value;

    if (this.props.type === 'currency') {
      value = Number(value);
    }

    if (this.props.type === 'date') {
      value = Input.valueToDate(value);
    }

    this.props.onBlur(value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.valueToString(nextProps.value),
    });
  }

  render() {
    const className = 'digituz-react-input ' + this.props.className;
    return (
      <input
        id={this.props.id}
        className={className}
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        placeholder={this.props.placeholder}
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onBlur: PropTypes.func.isRequired,
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
