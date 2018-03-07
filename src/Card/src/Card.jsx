import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      gridColumnStart: this.props.offset + 1,
      gridColumnEnd: `span ${this.props.span}`,
    };

    return (
      <div style={style} className="digituz-react-card">
        {this.props.children}
      </div>
    )
  }
}

Card.propTypes = {
  sm: PropTypes.instanceOf(PropTypes.shape({
    span: PropTypes.number,
    offset: PropTypes.number,
  })),
  md: PropTypes.instanceOf(PropTypes.shape({
    span: PropTypes.number,
    offset: PropTypes.number,
  })),
  lg: PropTypes.instanceOf(PropTypes.shape({
    span: PropTypes.number,
    offset: PropTypes.number,
  })),
  xl: PropTypes.instanceOf(PropTypes.shape({
    span: PropTypes.number,
    offset: PropTypes.number,
  })),
};

Card.defaultProps = {
  sm: {
    span: 1,
    offset: `auto`,
  },
  md: {
    span: 1,
    offset: `auto`,
  },
  lg: {
    span: 1,
    offset: `auto`,
  },
  xl: {
    span: 1,
    offset: `auto`,
  },
};

export default Card;
