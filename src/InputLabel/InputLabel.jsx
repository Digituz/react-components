import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import './InputLabel.scss';
import TextArea from "../TextArea/TextArea";

class InputLabel extends Component {
  renderInput() {
    return <Input
      id={this.props.inputId}
      value={this.props.value}
      className={this.props.inputClassName}
      onBlur={this.props.onBlur}
      placeholder={this.props.placeholder}
      type={this.props.type}
    />;
  }

  renderTextArea() {
    return <TextArea
      onBlur={this.props.onBlur}
      placeholder={this.props.placeholder}
      value={this.props.value}
    />
  }

  render() {
    const className = 'drc-input-label ' + this.props.className;
    return (
      <div className={className}>
        <label htmlFor={this.props.inputId}>{this.props.label}</label>
        {
          this.props.inputType === 'textarea' ?
            this.renderTextArea() :
            this.renderInput()
        }
      </div>
    )
  }
}

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputType: PropTypes.string,
};

InputLabel.defaultProps = {
  className: '',
  inputClassName: '',
  placeholder: '',
  type: 'text',
};

export default InputLabel;
