import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const classes = `drc-card ${this.props.className}`;
    return (
      <div className={classes}>
        <div className="drc-card-header">
          <h2>{this.props.title}</h2>
        </div>
        <div className="drc-card-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Card.defaultProps = {
  className: '',
};

export default Card;
