import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@digituz/react-button';
import If from '@digituz/react-if';
import './Modal.css';

class Modal extends Component {
  render() {
    return (
      <div className="digituz-react-modal-overlay">
        <h3>Hello, friend!</h3>
        <p>Not goot to go yet, I guess.</p>
        <If condition={this.props.onSuccess}>
          <Button onClick={this.props.onSuccess} text="Ok" />
        </If>
        <If condition={this.props.onFailure}>
          <Button onClick={this.props.onFailure} text="Cancel" />
        </If>
      </div>
    );
  }
}

Modal.propTypes = {
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

Modal.defaultProps = {
  onSuccess: null,
  onFailure: null,
};

export default Modal;
