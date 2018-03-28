import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './Dropdown.scss';

class Dropdown extends Component {
  constructor() {
    super();

    this.state = {
      optionsVisible: false,
    }
  }

  toggleOptions() {
    this.setState({
      optionsVisible: !this.state.optionsVisible,
    });
  }

  closeOptions() {
    if (!this.state.optionsVisible) return;
    this.setState({
      optionsVisible: false,
    });
  }

  render() {
    const optionsClass = `drc-dropdown-options ${this.state.optionsVisible ? 'visible' : ''}`;
    const defaultOption = this.props.options.filter(option => (option.default))[0];
    const otherOptions = this.props.options.filter(option => (!option.default));
    return (
      <div onBlur={(event) => { this.closeOptions(event) }} className="drc-dropdown-container">
        <Button className="main-button" text={defaultOption.label} onClick={defaultOption.onClick} />
        <Button className="dropdown-button" text="▼" onClick={() => {this.toggleOptions()}} />
        <ul className={optionsClass}>
          { otherOptions.map((option, idx) => (
            <li key={idx} onMouseDown={(event) => {event.preventDefault()}} onClick={option.onClick}>{option.label}</li>
          ))}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes ={
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    default: PropTypes.bool
  })).isRequired,
};

export default Dropdown;
