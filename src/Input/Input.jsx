import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {maskJs, maskCurrency, removeNonDigits} from 'mask-js';
import DatePicker from '../DatePicker/DatePicker';
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
      showDatePicker: false,
    };

    this.toggleDatePicker = this.toggleDatePicker.bind(this);
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
    if (this.props.type === 'text') {
      return value;
    }
    if (this.props.type === 'currency') {
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

    if (this.selectionStart !== this.selectionEnd) {
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
      if (value === event.target.value) value = `${value}.00`;
      else value = `${value.substring(0, value.length - 2)}.${value.substring(value.length - 2)}`;
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
      if (this.selectionStart !== this.selectionEnd) {
        node.selectionStart = node.value.length;
        node.selectionEnd = node.value.length;
        return;
      }

      let lengthDiff = node.value.length - this.oldLength;
      const inserting = lengthDiff >= 0;

      let newIdx = 0;
      if (lengthDiff === 0) {
        newIdx = Math.max(0, node.value.length - this.oldLength + this.oldIndex);
      } else {
        newIdx = Math.max(0, node.value.length - this.oldLength + this.oldIndex - (inserting ? 1 : -1));
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

  onSelect(event) {
    const node = event.target;
    this.selectionStart = node.selectionStart;
    this.selectionEnd = node.selectionEnd;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.valueToString(nextProps.value),
    });
  }

  toggleDatePicker() {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
    });
  }

  render() {
    const className = 'drc-input ' + this.props.className;
    const readOnly = this.props.type === 'date';

    const showDatePicker = readOnly ?
      this.toggleDatePicker :
      () => {};

    const items = [
      <input
        key="input"
        id={this.props.id}
        className={className}
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onSelect={(event) => {this.onSelect(event)}}
        placeholder={this.props.placeholder}
        onClick={showDatePicker}
        readOnly={readOnly}
      />
    ];

    if (readOnly && this.state.showDatePicker) items.push(
      <DatePicker
        key="date-picker"
        date={this.props.value}
        onCancel={() => this.toggleDatePicker()}
        onOk={(date) => {
          this.toggleDatePicker();
          this.props.onBlur(date)
        }}
      />
    );

    return items;
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
