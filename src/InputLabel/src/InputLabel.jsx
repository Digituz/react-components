import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from '@digituz/react-input';

class InputLabel extends Component {
  render() {
    const className = this.props.className || 'digituz-react-input-label';
    return (
      <div className={className}>
        <label htmlFor={this.props.inputId}>{this.props.label}</label>
        <Input
          id={this.props.inputId}
          value={this.props.value}
          className={this.props.inputClassName}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

InputLabel.defaultProps = {
  className: '',
  inputClassName: '',
  placeholder: '',
};

export default InputLabel;
