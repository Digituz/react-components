import React, { Component } from 'react';
import Header from '@digituz/react-header'
import PropTypes from 'prop-types';
import './Panel.scss'

class Panel extends Component {
  render() {
    return (
      <div className="digituz-panel">
        <div className="digituz-panel-coloured-border" />
        <Header title={this.props.title}>
          {this.props.children}
        </Header>
      </div>
    )
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Panel;
