import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const classes = `digituz-react-card ${this.props.className}`;
    return (
      <div className={classes}>
        <div className="digituz-react-card-header">
          <h2>{this.props.title}</h2>
        </div>
        <div className="digituz-react-card-body">
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
