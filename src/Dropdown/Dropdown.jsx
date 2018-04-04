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

  handleOptionClick(event, onClick) {
    this.closeOptions();
    onClick(event);
  }

  render() {
    const optionsClass = `drc-dropdown-options ${this.state.optionsVisible ? 'visible' : ''}`;
    const defaultOption = this.props.options.filter(option => (option.default))[0];
    const otherOptions = this.props.options.filter(option => (!option.default));
    return (
      <div onBlur={(event) => { this.closeOptions(event) }} className="drc-dropdown-container">
        <Button className="main-button" text={defaultOption.label} onClick={defaultOption.onClick} />
        <Button
          className="dropdown-button"
          text="▼"
          onClick={() => {this.toggleOptions()}}
          ref={(dropdownButton) => { this.dropdownButton = dropdownButton; }}
        />
        <ul className={optionsClass} ref={(optionsList) => { this.optionsList = optionsList; }}>
          { otherOptions.map((option, idx) => (
            <li
              key={idx}
              onMouseDown={(event) => {event.preventDefault()}}
              onClick={(event) => { this.handleOptionClick(event, option.onClick) }}>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidUpdate() {
    if (!this.state.optionsVisible) return;
    console.log(this.dropdownButton);
    console.log(this.dropdownButton.updater);
    return;
    const {bottom, right} = this.dropdownButton.getBoundingClientRect();
    this.optionsList.style.bottom = `${bottom}px`;
    this.optionsList.style.right = `${right}px`;

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
