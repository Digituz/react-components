'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maskJs = require('mask-js');

var _DatePicker = require('../DatePicker/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

require('./Input.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function (_Component) {
  (0, _inherits3.default)(Input, _Component);

  function Input(props) {
    (0, _classCallCheck3.default)(this, Input);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.onBlur = _this.onBlur.bind(_this);
    _this.onChange = _this.onChange.bind(_this);

    _this.oldLength = 0;
    _this.oldIndex = 0;

    _this.state = {
      value: _this.valueToString(_this.props.value),
      showDatePicker: false
    };

    _this.toggleDatePicker = _this.toggleDatePicker.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Input, [{
    key: 'valueToString',
    value: function valueToString(value) {
      if (this.props.type === 'text') {
        return value;
      }
      if (this.props.type === 'currency') {
        return (0, _maskJs.maskCurrency)(value);
      }
      if (this.props.type === 'date') {
        return Input.dateToString(value ? new Date(value) : null);
      }
    }
  }, {
    key: 'removeSelection',
    value: function removeSelection(event) {
      var node = event.target;

      if (this.selectionStart !== this.selectionEnd) {
        node.selectionStart = event.target.value.length;
        node.selectionEnd = event.target.value.length;
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      var _this2 = this;

      var value = event.target.value;

      if (this.props.type === 'text') {
        this.setState({
          value: value
        });
        return;
      }

      if (this.props.type === 'currency') {
        value = (0, _maskJs.removeNonDigits)(value);
        if (value === event.target.value) value = value + '.00';else value = value.substring(0, value.length - 2) + '.' + value.substring(value.length - 2);
        value = (0, _maskJs.maskCurrency)(value);
      }

      if (this.props.type === 'date') {
        value = (0, _maskJs.maskJs)('99/99/9999', value);
      }

      var node = event.target;
      this.oldLength = this.state.value.length;
      this.oldIndex = node.selectionStart;

      this.setState({
        value: value
      }, function () {
        if (_this2.selectionStart !== _this2.selectionEnd) {
          node.selectionStart = node.value.length;
          node.selectionEnd = node.value.length;
          return;
        }

        var lengthDiff = node.value.length - _this2.oldLength;
        var inserting = lengthDiff >= 0;

        var newIdx = 0;
        if (lengthDiff === 0) {
          newIdx = Math.max(0, node.value.length - _this2.oldLength + _this2.oldIndex);
        } else {
          newIdx = Math.max(0, node.value.length - _this2.oldLength + _this2.oldIndex - (inserting ? 1 : -1));
        }

        node.selectionStart = newIdx;
        node.selectionEnd = newIdx;
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      this.removeSelection(event);
      var value = this.state.value;

      if (this.props.type === 'currency') {
        value = Number(value.replace(/,/g, ''));
      }

      if (this.props.type === 'date') {
        value = Input.valueToDate(value);
      }

      this.props.onBlur(value);
    }
  }, {
    key: 'onSelect',
    value: function onSelect(event) {
      var node = event.target;
      this.selectionStart = node.selectionStart;
      this.selectionEnd = node.selectionEnd;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        value: this.valueToString(nextProps.value)
      });
    }
  }, {
    key: 'toggleDatePicker',
    value: function toggleDatePicker() {
      this.setState({
        showDatePicker: !this.state.showDatePicker
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var className = 'drc-input ' + this.props.className;
      var readOnly = this.props.type === 'date';

      var showDatePicker = readOnly ? this.toggleDatePicker : function () {};

      var items = [_react2.default.createElement('input', {
        key: 'input',
        id: this.props.id,
        className: className,
        value: this.state.value,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onSelect: function onSelect(event) {
          _this3.onSelect(event);
        },
        placeholder: this.props.placeholder,
        onClick: showDatePicker,
        readOnly: readOnly
      })];

      if (readOnly && this.state.showDatePicker) items.push(_react2.default.createElement(_DatePicker2.default, {
        key: 'date-picker',
        date: this.props.value,
        onCancel: function onCancel() {
          return _this3.toggleDatePicker();
        },
        onOk: function onOk(date) {
          _this3.toggleDatePicker();
          _this3.props.onBlur(date);
        }
      }));

      return items;
    }
  }], [{
    key: 'dateToString',
    value: function dateToString(date) {
      if (!date) return '';
      var mm = date.getMonth() + 1; // getMonth() is zero-based
      var dd = date.getDate();

      return [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, date.getFullYear()].join('/');
    }
  }, {
    key: 'valueToDate',
    value: function valueToDate(value) {
      if (!value) return null;
      var timezoneDiff = new Date().getTimezoneOffset() / 60;
      var year = Number(value.substring(6, 10));
      var month = Number(value.substring(3, 5));
      var day = Number(value.substring(0, 2));
      if (!year || !month || !day) {
        return null;
      }
      var newDate = new Date(Date.UTC(year, month - 1, day, timezoneDiff, 0, 0));
      if (isNaN(newDate.getTime())) {
        return null;
      }
      return newDate;
    }
  }]);
  return Input;
}(_react.Component);

Input.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]),
  onBlur: _propTypes2.default.func.isRequired,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  type: _propTypes2.default.string
};

Input.defaultProps = {
  id: '',
  className: '',
  placeholder: '',
  type: 'text'
};

exports.default = Input;