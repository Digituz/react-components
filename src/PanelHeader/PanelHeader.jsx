import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PanelHeader.scss';

class PanelHeader extends Component {
  render() {
    const className = this.props.className || 'digituz-react-panel-header';
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

PanelHeader.propTypes = {
  className: PropTypes.string,
};

PanelHeader.defaultProps = {
  className: '',
};

export default PanelHeader;
