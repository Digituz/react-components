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
      notification.time = (new Date()).getTime();
      this.setState({
        notifications: [
          ...this.state.notifications,
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

  render() {
    return (
      <div className="digituz-react-notification-container abc">
        {this.state.notifications.map((notification) => {
          const className = `digituz-react-notification ${notification.type}`;
          return (
            <div key={notification.time} className={className}>
              {notification.message}
            </div>
          );
        })}
      </div>
    );
  }
}

export default NotificationContainer;
