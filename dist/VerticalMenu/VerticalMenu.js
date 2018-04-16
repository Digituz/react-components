'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _If = require('../If/If');

var _If2 = _interopRequireDefault(_If);

require('./VerticalMenu.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerticalMenu = function (_Component) {
  _inherits(VerticalMenu, _Component);

  function VerticalMenu(props) {
    _classCallCheck(this, VerticalMenu);

    var _this = _possibleConstructorReturn(this, (VerticalMenu.__proto__ || Object.getPrototypeOf(VerticalMenu)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(VerticalMenu, [{
    key: 'closeMenu',
    value: function closeMenu() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: 'openMenu',
    value: function openMenu() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = 'drc-vertical-menu ' + this.props.className;
      if (this.state.visible) classes += ' state-visible';

      return _react2.default.createElement(
        'div',
        { className: 'drc-vertical-menu-container' },
        _react2.default.createElement(
          'div',
          { onClick: function onClick() {
              _this2.openMenu();
            } },
          _react2.default.createElement(
            'svg',
            { className: 'menu-svg-button' },
            _react2.default.createElement('line', { x1: '13', y1: '15', x2: '27', y2: '15', stroke: 'gray', strokeWidth: '2' }),
            _react2.default.createElement('line', { x1: '13', y1: '20', x2: '27', y2: '20', stroke: 'gray', strokeWidth: '2' }),
            _react2.default.createElement('line', { x1: '13', y1: '25', x2: '27', y2: '25', stroke: 'gray', strokeWidth: '2' })
          )
        ),
        _react2.default.createElement(
          _If2.default,
          { condition: this.state.visible },
          _react2.default.createElement('div', { onClick: function onClick() {
              _this2.closeMenu();
            }, className: 'drc-vertical-menu-overlay' })
        ),
        _react2.default.createElement(
          'div',
          { className: classes },
          _react2.default.createElement(
            'div',
            { className: 'menu-options-container' },
            _react2.default.createElement(
              'svg',
              { onClick: function onClick() {
                  _this2.closeMenu();
                }, className: 'menu-svg-button close-menu' },
              _react2.default.createElement('line', { x1: '11', y1: '20', x2: '20', y2: '12', stroke: 'gray', strokeWidth: '2' }),
              _react2.default.createElement('line', { x1: '10', y1: '20', x2: '30', y2: '20', stroke: 'gray', strokeWidth: '2' }),
              _react2.default.createElement('line', { x1: '11', y1: '20', x2: '20', y2: '28', stroke: 'gray', strokeWidth: '2' })
            ),
            this.props.submenus.map(function (submenu, idx) {
              return _react2.default.createElement(
                'div',
                { key: idx },
                _react2.default.createElement(
                  'h3',
                  null,
                  submenu.title
                ),
                _react2.default.createElement(
                  'ul',
                  null,
                  submenu.items.map(function (item, idx) {
                    return _react2.default.createElement(
                      'li',
                      { onClick: item.onClick, key: idx },
                      _react2.default.createElement(
                        'svg',
                        { height: '10', width: '20' },
                        _react2.default.createElement('circle', { cx: '5', cy: '5', r: '5', fill: item.color })
                      ),
                      item.title
                    );
                  })
                )
              );
            })
          ),
          _react2.default.createElement(
            'p',
            { className: 'powered-by-digituz' },
            'Powered by Digituz'
          )
        )
      );
    }
  }]);

  return VerticalMenu;
}(_react.Component);

VerticalMenu.propTypes = {
  className: _propTypes2.default.string,
  submenus: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.string.isRequired,
    items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      title: _propTypes2.default.string.isRequired,
      color: _propTypes2.default.string.isRequired,
      onClick: _propTypes2.default.func.isRequired
    }))
  }))
};

VerticalMenu.defaultProps = {
  className: ''
};

exports.default = VerticalMenu;