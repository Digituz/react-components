'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NotificationManager = require('./NotificationManager');

var _NotificationManager2 = _interopRequireDefault(_NotificationManager);

require('./NotificationContainer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationContainer = function (_Component) {
  _inherits(NotificationContainer, _Component);

  function NotificationContainer() {
    _classCallCheck(this, NotificationContainer);

    var _this = _possibleConstructorReturn(this, (NotificationContainer.__proto__ || Object.getPrototypeOf(NotificationContainer)).call(this));

    _this.state = {
      notifications: []
    };
    return _this;
  }

  _createClass(NotificationContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var emitter = _NotificationManager2.default.getEmitter();
      this.subscription = emitter.addListener('new-notification', function (notification) {
        var withoutRepeated = _this2.state.notifications.filter(function (existingNotifications) {
          return notification.type !== existingNotifications.type || notification.message !== existingNotifications.message;
        });

        notification.time = new Date().getTime();
        _this2.setState({
          notifications: [].concat(_toConsumableArray(withoutRepeated), [notification])
        });
      });

      this.intervalSubscription = setInterval(function () {
        var now = new Date().getTime();
        var notifications = _this2.state.notifications.filter(function (notification) {
          return now - notification.time < 6000;
        });
        _this2.setState({
          notifications: notifications
        });
      }, 100);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.subscription.remove();
      clearInterval(this.intervalSubscription);
    }
  }, {
    key: 'removeNotification',
    value: function removeNotification(notificationTime) {
      var notifications = this.state.notifications.filter(function (notification) {
        return notification.time !== notificationTime;
      });
      this.setState({
        notifications: notifications
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'drc-notification-container' },
        this.state.notifications.map(function (notification) {
          var className = 'drc-notification ' + notification.type;
          return _react2.default.createElement(
            'div',
            { key: notification.time, onClick: function onClick() {
                _this3.removeNotification(notification.time);
              }, className: className },
            _react2.default.createElement(
              'h3',
              null,
              notification.title || notification.type
            ),
            notification.message,
            _react2.default.createElement(
              'svg',
              { width: '10', height: '10', viewBox: '0 0 10 10' },
              _react2.default.createElement('line', { x1: '0', y1: '0', x2: '10', y2: '10', strokeWidth: 3 }),
              _react2.default.createElement('line', { x1: '0', y1: '10', x2: '10', y2: '0', strokeWidth: 3 })
            )
          );
        })
      );
    }
  }]);

  return NotificationContainer;
}(_react.Component);

exports.default = NotificationContainer;