'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  _createClass(Modal, [{
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