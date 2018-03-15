import React, { Component } from 'react';
import './Panel.scss'

class Panel extends Component {
  render() {
    return (
      <div className="digituz-panel">
        <div className="digituz-panel-coloured-border" />
        {this.props.children}
      </div>
    )
  }
}

export default Panel;
