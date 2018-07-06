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

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _If = require('../If/If');

var _If2 = _interopRequireDefault(_If);

require('./Modal.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function (_Component) {
  (0, _inherits3.default)(Modal, _Component);

  function Modal() {
    (0, _classCallCheck3.default)(this, Modal);
    return (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  (0, _createClass3.default)(Modal, [{
    key: 'render',
    value: function render() {
      var cancelFunction = this.props.onCancel || function () {};
      return _react2.default.createElement(
        'div',
        { className: 'drc-modal-overlay' },
        _react2.default.createElement(
          'div',
          { className: 'drc-modal' },
          _react2.default.createElement('div', { className: 'drc-modal-gradient' }),
          _react2.default.createElement(
            'div',
            { className: 'drc-modal-body' },
            this.props.children
          ),
          _react2.default.createElement(
            'div',
            { className: 'drc-modal-footer' },
            _react2.default.createElement(
              _If2.default,
              { condition: this.props.onCancel !== null },
              _react2.default.createElement(_Button2.default, {
                className: 'default',
                onClick: cancelFunction,
                text: 'Cancel'
              })
            ),
            _react2.default.createElement(_Button2.default, {
              className: 'success',
              onClick: this.props.onSuccess,
              text: 'Ok'
            })
          )
        )
      );
    }
  }]);
  return Modal;
}(_react.Component);

Modal.propTypes = {
  onCancel: _propTypes2.default.func,
  onSuccess: _propTypes2.default.func.isRequired
};

Modal.defaultProps = {
  onCancel: null
};

exports.default = Modal;