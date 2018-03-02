import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PanelHeader.css';

class PanelHeader extends Component {
  render() {
    const className = this.props.className || 'digituz-react-panel-header';
    return (
      <div className={className}>
        <div>
          <h1>{this.props.title}</h1>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

PanelHeader.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

PanelHeader.defaultProps = {
  className: '',
};

export default PanelHeader;
