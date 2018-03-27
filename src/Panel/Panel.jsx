import React, { Component } from 'react';
import './Panel.scss'

class Panel extends Component {
  render() {
    return (
      <div className="drc-panel">
        <div className="drc-panel-coloured-border" />
        {this.props.children}
      </div>
    )
  }
}

export default Panel;
