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

var _Input = require('../Input/Input');

var _Input2 = _interopRequireDefault(_Input);

require('./InputLabel.css');

var _TextArea = require('../TextArea/TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputLabel = function (_Component) {
  (0, _inherits3.default)(InputLabel, _Component);

  function InputLabel() {
    (0, _classCallCheck3.default)(this, InputLabel);
    return (0, _possibleConstructorReturn3.default)(this, (InputLabel.__proto__ || Object.getPrototypeOf(InputLabel)).apply(this, arguments));
  }

  (0, _createClass3.default)(InputLabel, [{
    key: 'renderInput',
    value: function renderInput() {
      return _react2.default.createElement(_Input2.default, {
        id: this.props.inputId,
        value: this.props.value,
        className: this.props.inputClassName,
        onBlur: this.props.onBlur,
        placeholder: this.props.placeholder,
        type: this.props.type
      });
    }
  }, {
    key: 'renderTextArea',
    value: function renderTextArea() {
      return _react2.default.createElement(_TextArea2.default, {
        onBlur: this.props.onBlur,
        placeholder: this.props.placeholder,
        value: this.props.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'drc-input-label ' + this.props.className;
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'label',
          { htmlFor: this.props.inputId },
          this.props.label
        ),
        this.props.inputType === 'textarea' ? this.renderTextArea() : this.renderInput()
      );
    }
  }]);
  return InputLabel;
}(_react.Component);

InputLabel.propTypes = {
  label: _propTypes2.default.string.isRequired,
  inputId: _propTypes2.default.string.isRequired,
  onBlur: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]).isRequired,
  className: _propTypes2.default.string,
  inputClassName: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  type: _propTypes2.default.string,
  inputType: _propTypes2.default.string
};

InputLabel.defaultProps = {
  className: '',
  inputClassName: '',
  placeholder: '',
  type: 'text'
};

exports.default = InputLabel;