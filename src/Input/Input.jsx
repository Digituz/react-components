import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {maskJs, maskCurrency, removeNonDigits} from 'mask-js';
import './Input.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);

    this.oldLength = 0;
    this.oldIndex = 0;

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
      return maskCurrency(value);
    }
    if (this.props.type === 'date' && typeof value === 'object') {
      return Input.dateToString(value);
    }
  }

  static valueToDate(value) {
    const timezoneDiff = (new Date()).getTimezoneOffset() / 60;
    const year = Number(value.substring(6, 10));
    const month = Number(value.substring(3, 5));
    const day = Number(value.substring(0, 2));
    if (!year || !month || !day) {
      return null;
    }
    const newDate = new Date(Date.UTC(year, month - 1, day, timezoneDiff, 0, 0));
    if (isNaN(newDate.getTime())) {
      return null;
    }
    return newDate;
  }

  removeSelection(event) {
    const node = event.target;

    if (node.selectionStart !== node.selectionEnd) {
      node.selectionStart = event.target.value.length;
      node.selectionEnd = event.target.value.length;
    }
  }

  onChange(event) {
    let value = event.target.value;

    if (this.props.type === 'text') {
      this.setState({
        value,
      });
      return;
    }

    if (this.props.type === 'currency') {
      value = removeNonDigits(value);
      value = `${value.substring(0, value.length - 2)}.${value.substring(value.length - 2)}`;
      value = maskCurrency(value);
    }

    if (this.props.type === 'date') {
      value = maskJs('99/99/9999', value);
    }

    const node = event.target;
    this.oldLength = this.state.value.length;
    this.oldIndex = node.selectionStart;

    this.setState({
      value,
    }, () => {
      let lengthDiff = node.value.length - this.oldLength;
      const inserting = lengthDiff >= 0;

      let newIdx = 0;
      if (lengthDiff === 0) {
        newIdx = Math.max(0, node.value.length - this.oldLength + this.oldIndex);
      } else {
        inserting && (lengthDiff = 1);
        newIdx = Math.max(0, node.value.length - this.oldLength + this.oldIndex - lengthDiff);
      }

      node.selectionStart = newIdx;
      node.selectionEnd = newIdx;
    });
  }

  onBlur(event) {
    this.removeSelection(event);
    let value = this.state.value;

    if (this.props.type === 'currency') {
      value = Number(value.replace(/,/g, ''));
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
        onKeyUp={this.removeSelection}
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
