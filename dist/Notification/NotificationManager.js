'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fbemitter = require('fbemitter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = new _fbemitter.EventEmitter();

var NotificationManager = function () {
  function NotificationManager() {
    (0, _classCallCheck3.default)(this, NotificationManager);
  }

  (0, _createClass3.default)(NotificationManager, null, [{
    key: 'getEmitter',
    value: function getEmitter() {
      return emitter;
    }
  }, {
    key: 'success',
    value: function success(message, title) {
      addNotification('success', message, title);
    }
  }, {
    key: 'warning',
    value: function warning(message, title) {
      addNotification('warning', message, title);
    }
  }, {
    key: 'danger',
    value: function danger(message, title) {
      addNotification('danger', message, title);
    }
  }]);
  return NotificationManager;
}();

var addNotification = function addNotification(type, message, title) {
  emitter.emit('new-notification', {
    type: type,
    message: message,
    title: title
  });
};

exports.default = NotificationManager;