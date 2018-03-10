import React, { Component } from 'react';
import './Grid.css';

class Grid extends Component {
  render() {
    return (
      <div className="digituz-react-grid">
        {this.props.children}
      </div>
    );
  }
}

export default Grid;
