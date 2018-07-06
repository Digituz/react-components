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

var _Grid = require('../Grid/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

require('./PanelBody.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelBody = function (_Component) {
  (0, _inherits3.default)(PanelBody, _Component);

  function PanelBody() {
    (0, _classCallCheck3.default)(this, PanelBody);
    return (0, _possibleConstructorReturn3.default)(this, (PanelBody.__proto__ || Object.getPrototypeOf(PanelBody)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelBody, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'drc-panel-body' },
        _react2.default.createElement(
          _Grid2.default,
          null,
          this.props.children
        )
      );
    }
  }]);
  return PanelBody;
}(_react.Component);

exports.default = PanelBody;