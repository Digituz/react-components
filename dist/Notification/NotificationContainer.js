'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _NotificationManager = require('./NotificationManager');

var _NotificationManager2 = _interopRequireDefault(_NotificationManager);

require('./NotificationContainer.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationContainer = function (_Component) {
  (0, _inherits3.default)(NotificationContainer, _Component);

  function NotificationContainer() {
    (0, _classCallCheck3.default)(this, NotificationContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NotificationContainer.__proto__ || Object.getPrototypeOf(NotificationContainer)).call(this));

    _this.state = {
      notifications: []
    };
    return _this;
  }

  (0, _createClass3.default)(NotificationContainer, [{
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
          notifications: [].concat((0, _toConsumableArray3.default)(withoutRepeated), [notification])
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