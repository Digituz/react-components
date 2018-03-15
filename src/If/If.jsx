import React, { Component } from 'react';
import PropTypes from 'prop-types';

class If extends Component {
  render() {
    if (! this.props.condition) return null;
    return this.props.children;
  }
}

If.propTypes = {
  condition: PropTypes.bool.isRequired,
};

export default If;
