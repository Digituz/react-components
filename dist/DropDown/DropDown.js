'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

require('./DropDown.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropDown = function (_Component) {
  (0, _inherits3.default)(DropDown, _Component);

  function DropDown() {
    (0, _classCallCheck3.default)(this, DropDown);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this));

    _this.state = {
      optionsVisible: false,
      optionsTop: 0,
      optionsRight: 0
    };

    _this.updateOptionsPosition = _this.updateOptionsPosition.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DropDown, [{
    key: 'updateOptionsPosition',
    value: function updateOptionsPosition() {
      if (!this.state.optionsVisible) return;

      var now = new Date().getTime();
      if (this.then && now - this.then < 10) return;
      this.then = now;
      this.setState(DropDown.calcPosition(this.optionsOpener));
    }
  }, {
    key: 'toggleOptions',
    value: function toggleOptions(event) {
      this.optionsOpener = event.target;

      var optionsPosition = DropDown.calcPosition(this.optionsOpener);

      window.addEventListener('scroll', this.updateOptionsPosition);

      this.setState((0, _extends3.default)({
        optionsVisible: !this.state.optionsVisible
      }, optionsPosition));
    }
  }, {
    key: 'closeOptions',
    value: function closeOptions() {
      if (!this.state.optionsVisible) return;

      window.removeEventListener('scroll', this.updateOptionsPosition);

      this.setState({
        optionsVisible: false
      });
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(event, onClick) {
      this.closeOptions();
      onClick(event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var optionsClass = 'drc-dropdown-options ' + (this.state.optionsVisible ? 'visible' : '');
      var optionsStyle = {
        top: this.state.optionsTop + 'px',
        right: this.state.optionsRight + 'px'
      };
      var defaultOption = this.props.options.filter(function (option) {
        return option.default;
      })[0];
      var otherOptions = this.props.options.filter(function (option) {
        return !option.default;
      });
      return _react2.default.createElement(
        'div',
        { onBlur: function onBlur(event) {
            _this2.closeOptions(event);
          }, className: 'drc-dropdown-container' },
        _react2.default.createElement(_Button2.default, { className: 'main-button', text: defaultOption.label, onClick: defaultOption.onClick }),
        _react2.default.createElement(_Button2.default, {
          className: 'dropdown-button',
          text: '\u25BC',
          onClick: function onClick(event) {
            _this2.toggleOptions(event);
          }
        }),
        _react2.default.createElement(
          'ul',
          { style: optionsStyle, className: optionsClass },
          otherOptions.map(function (option, idx) {
            return _react2.default.createElement(
              'li',
              {
                key: idx,
                onMouseDown: function onMouseDown(event) {
                  event.preventDefault();
                },
                onClick: function onClick(event) {
                  _this2.handleOptionClick(event, option.onClick);
                } },
              option.label
            );
          })
        )
      );
    }
  }], [{
    key: 'calcPosition',
    value: function calcPosition(target) {
      var _target$getBoundingCl = target.getBoundingClientRect(),
          bottom = _target$getBoundingCl.bottom,
          right = _target$getBoundingCl.right;

      return {
        optionsTop: bottom - 10,
        optionsRight: window.innerWidth - right
      };
    }
  }]);
  return DropDown;
}(_react.Component);

DropDown.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    default: _propTypes2.default.bool
  })).isRequired
};

exports.default = DropDown;