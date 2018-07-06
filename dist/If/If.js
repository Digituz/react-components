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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var If = function (_Component) {
  (0, _inherits3.default)(If, _Component);

  function If() {
    (0, _classCallCheck3.default)(this, If);
    return (0, _possibleConstructorReturn3.default)(this, (If.__proto__ || Object.getPrototypeOf(If)).apply(this, arguments));
  }

  (0, _createClass3.default)(If, [{
    key: 'render',
    value: function render() {
      if (!this.props.condition) return null;
      return this.props.children;
    }
  }]);
  return If;
}(_react.Component);

If.propTypes = {
  condition: _propTypes2.default.bool.isRequired
};

exports.default = If;