import React, {Component} from 'react';
import NotificationManager from './NotificationManager';
import './NotificationContainer.scss';

class NotificationContainer extends Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    const emitter = NotificationManager.getEmitter();
    this.subscription = emitter.addListener('new-notification', (notification) => {
      const withoutRepeated = this.state.notifications.filter((existingNotifications) => (
        notification.type !== existingNotifications.type ||
        notification.message !== existingNotifications.message
      ));

      notification.time = (new Date()).getTime();
      this.setState({
        notifications: [
          ...withoutRepeated,
          notification,
        ]
      });
    });

    this.intervalSubscription = setInterval(() => {
      const now = (new Date()).getTime();
      const notifications = this.state.notifications.filter((notification) => (now - notification.time < 6000));
      this.setState({
        notifications,
      });
    }, 100);
  }

  componentWillUnmount() {
    this.subscription.remove();
    clearInterval(this.intervalSubscription);
  }

  removeNotification(notificationTime) {
    const notifications = this.state.notifications.filter((notification) => (notification.time !== notificationTime));
    this.setState({
      notifications,
    });
  }

  render() {
    return (
      <div className="digituz-react-notification-container">
        {this.state.notifications.map((notification) => {
          const className = `digituz-react-notification ${notification.type}`;
          return (
            <div key={notification.time} onClick={() => {this.removeNotification(notification.time)}} className={className}>
              <h3>{notification.title || notification.type}</h3>
              {notification.message}
              <svg width="10" height="10" viewBox="0 0 10 10">
                <line x1="0" y1="0" x2="10" y2="10" strokeWidth={3} />
                <line x1="0" y1="10" x2="10" y2="0" strokeWidth={3} />
              </svg>
            </div>
          );
        })}
      </div>
    );
  }
}

export default NotificationContainer;
