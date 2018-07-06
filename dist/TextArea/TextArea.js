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

require('./TextArea.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextArea = function (_Component) {
  (0, _inherits3.default)(TextArea, _Component);

  function TextArea(props) {
    (0, _classCallCheck3.default)(this, TextArea);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

    _this.state = {
      value: props.value
    };
    return _this;
  }

  (0, _createClass3.default)(TextArea, [{
    key: 'updateValue',
    value: function updateValue(event) {
      var value = event.target.value;

      this.setState({
        value: value
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      this.props.onBlur(event.target.value);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('textarea', {
        className: 'drc-textarea',
        placeholder: this.props.placeholder,
        onChange: function onChange(e) {
          return _this2.updateValue(e);
        },
        onBlur: function onBlur(e) {
          return _this2.onBlur(e);
        },
        rows: '5',
        value: this.state.value
      });
    }
  }]);
  return TextArea;
}(_react.Component);

TextArea.propTypes = {
  onBlur: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string
};

exports.default = TextArea;