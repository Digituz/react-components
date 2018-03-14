import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@digituz/react-button';
import Card from '@digituz/react-card';
import './Modal.css';

class Modal extends Component {
  render() {
    return (
      <div className="digituz-react-modal-overlay">
        <Card title="Hello, friend!!">
          <p>Not good to go yet, I guess.</p>
          <div className="digituz-react-modal-actions">
            <Button onClick={this.props.onSuccess} text={this.props.successLabel} />
            <Button onClick={this.props.onFailure} text={this.props.cancelLabel} />
          </div>
        </Card>
      </div>
    );
  }
}

Modal.propTypes = {
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  successLabel: PropTypes.string,
};

Modal.defaultProps = {
  cancelLabel: 'Cancel',
  onCancel: () => {},
  onSuccess: () => {},
  successLabel: 'Ok',
};

export default Modal;
