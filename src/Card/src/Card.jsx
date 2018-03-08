import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const classes = `digituz-react-card ${this.props.className}`;
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}

Card.propTypes = {
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;
