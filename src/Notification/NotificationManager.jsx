import {EventEmitter} from 'fbemitter';

const emitter = new EventEmitter();

class NotificationManager {
  static getEmitter() {
    return emitter;
  }

  static success(message, title) {
    addNotification('success', message, title);
  }

  static warning(message, title) {
    addNotification('warning', message, title);
  }

  static danger(message, title) {
    addNotification('danger', message, title);
  }
}

const addNotification = (type, message, title) => {
  emitter.emit('new-notification', {
    type,
    message,
    title,
  });
};

export default NotificationManager;
