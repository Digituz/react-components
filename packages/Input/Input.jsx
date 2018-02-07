import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  <input
    className={props.className}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
  />
);

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
};

export default Input;
