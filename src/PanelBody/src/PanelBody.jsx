import React, { Component } from 'react';
import './PanelBody.css';

class PanelBody extends Component {
  render() {
    return (
      <div className="digituz-react-panel-body">
        {this.props.children}
      </div>
    );
  }
}

export default PanelBody;
