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

require('./Card.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card(props) {
    (0, _classCallCheck3.default)(this, Card);
    return (0, _possibleConstructorReturn3.default)(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));
  }

  (0, _createClass3.default)(Card, [{
    key: 'render',
    value: function render() {
      var classes = 'drc-card ' + this.props.className;
      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: 'drc-card-header' },
          _react2.default.createElement(
            'h2',
            null,
            this.props.title
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'drc-card-body' },
          this.props.children
        )
      );
    }
  }]);
  return Card;
}(_react.Component);

Card.propTypes = {
  className: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired
};

Card.defaultProps = {
  className: ''
};

exports.default = Card;