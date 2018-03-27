import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import './PanelBody.scss';

class PanelBody extends Component {
  render() {
    return (
      <div className="drc-panel-body">
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default PanelBody;
