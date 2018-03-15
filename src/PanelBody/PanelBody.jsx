import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import './PanelBody.css';

class PanelBody extends Component {
  render() {
    return (
      <div className="digituz-react-panel-body">
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default PanelBody;
