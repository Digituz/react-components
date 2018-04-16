'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

require('./DropDown.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDown = function (_Component) {
  _inherits(DropDown, _Component);

  function DropDown() {
    _classCallCheck(this, DropDown);

    var _this = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this));

    _this.state = {
      optionsVisible: false,
      optionsTop: 0,
      optionsRight: 0
    };

    _this.updateOptionsPosition = _this.updateOptionsPosition.bind(_this);
    return _this;
  }

  _createClass(DropDown, [{
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

      this.setState(_extends({
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