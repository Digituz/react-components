'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputLabel = function (_Component) {
  _inherits(InputLabel, _Component);

  function InputLabel() {
    _classCallCheck(this, InputLabel);

    return _possibleConstructorReturn(this, (InputLabel.__proto__ || Object.getPrototypeOf(InputLabel)).apply(this, arguments));
  }

  _createClass(InputLabel, [{
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