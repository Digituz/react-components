'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maskJs = require('mask-js');

var _DatePicker = require('../DatePicker/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

require('./Input.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

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

  _createClass(Input, [{
    key: 'valueToString',
    value: function valueToString(value) {
      if (typeof value === 'string') {
        return value;
      }
      if (typeof value === 'number') {
        return (0, _maskJs.maskCurrency)(value);
      }
      if (this.props.type === 'date' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return Input.dateToString(value);
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
      var mm = date.getMonth() + 1; // getMonth() is zero-based
      var dd = date.getDate();

      return [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, date.getFullYear()].join('/');
    }
  }, {
    key: 'valueToDate',
    value: function valueToDate(value) {
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
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]).isRequired,
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