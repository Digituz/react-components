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

require('./PanelHeader.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelHeader = function (_Component) {
  (0, _inherits3.default)(PanelHeader, _Component);

  function PanelHeader() {
    (0, _classCallCheck3.default)(this, PanelHeader);
    return (0, _possibleConstructorReturn3.default)(this, (PanelHeader.__proto__ || Object.getPrototypeOf(PanelHeader)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelHeader, [{
    key: 'render',
    value: function render() {
      var className = this.props.className || 'drc-panel-header';
      return _react2.default.createElement(
        'div',
        { className: className },
        this.props.children
      );
    }
  }]);
  return PanelHeader;
}(_react.Component);

PanelHeader.propTypes = {
  className: _propTypes2.default.string
};

PanelHeader.defaultProps = {
  className: ''
};

exports.default = PanelHeader;