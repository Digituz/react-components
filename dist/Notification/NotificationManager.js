'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fbemitter = require('fbemitter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emitter = new _fbemitter.EventEmitter();

var NotificationManager = function () {
  function NotificationManager() {
    _classCallCheck(this, NotificationManager);
  }

  _createClass(NotificationManager, null, [{
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