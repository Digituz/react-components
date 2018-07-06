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

var _If = require('../If/If');

var _If2 = _interopRequireDefault(_If);

require('./VerticalMenu.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerticalMenu = function (_Component) {
  (0, _inherits3.default)(VerticalMenu, _Component);

  function VerticalMenu(props) {
    (0, _classCallCheck3.default)(this, VerticalMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (VerticalMenu.__proto__ || Object.getPrototypeOf(VerticalMenu)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  (0, _createClass3.default)(VerticalMenu, [{
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