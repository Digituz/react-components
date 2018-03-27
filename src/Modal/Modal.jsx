import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import If from '../If/If';
import './Modal.scss';

class Modal extends Component {
  render() {
    const cancelFunction = this.props.onCancel || (() => {});
    return (
      <div className="drc-modal-overlay">
        <div className="drc-modal">
          <div className="drc-modal-gradient" />
          <div className="drc-modal-body">
            {this.props.children}
          </div>
          <div className="drc-modal-footer">
            <If condition={this.props.onCancel !== null}>
              <Button
                className="default"
                onClick={cancelFunction}
                text="Cancel"
              />
            </If>
            <Button
              className="success"
              onClick={this.props.onSuccess}
              text="Ok"
            />
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  onCancel: null,
};

export default Modal;
