import {EventEmitter} from 'fbemitter';

const emitter = new EventEmitter();

class NotificationManager {
  static getEmitter() {
    return emitter;
  }

  static success(message) {
    addNotification('success', message);
  }

  static warning(message) {
    addNotification('warning', message);
  }

  static danger(message) {
    addNotification('danger', message);
  }
}

const addNotification = (type, message) => {
  emitter.emit('new-notification', {
    type,
    message,
  });
};

export default NotificationManager;
