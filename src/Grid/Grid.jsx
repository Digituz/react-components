import React, { Component } from 'react';
import './Grid.scss';

class Grid extends Component {
  render() {
    return (
      <div className="drc-grid">
        {this.props.children}
      </div>
    );
  }
}

export default Grid;
