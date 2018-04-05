import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './DropDown.scss';

class DropDown extends Component {
  constructor() {
    super();

    this.state = {
      optionsVisible: false,
      optionsTop: 0,
      optionsRight: 0,
    };

    this.updateOptionsPosition = this.updateOptionsPosition.bind(this);
  }

  updateOptionsPosition() {
    if (!this.state.optionsVisible) return;

    const now = (new Date()).getTime();
    if (this.then && now - this.then < 10) return;
    this.then = now;
    this.setState(DropDown.calcPosition(this.optionsOpener));
  }

  static calcPosition(target) {
    const {bottom, right} = target.getBoundingClientRect();

    return {
      optionsTop: bottom - 10,
      optionsRight: window.innerWidth - right,
    };
  }

  toggleOptions(event) {
    this.optionsOpener = event.target;

    const optionsPosition = DropDown.calcPosition(this.optionsOpener);

    window.addEventListener('scroll', this.updateOptionsPosition);

    this.setState({
      optionsVisible: !this.state.optionsVisible,
      ...optionsPosition,
    });
  }

  closeOptions() {
    if (!this.state.optionsVisible) return;

    window.removeEventListener('scroll', this.updateOptionsPosition);

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
    const optionsStyle = {
      top: `${this.state.optionsTop}px`,
      right: `${this.state.optionsRight}px`,
    };
    const defaultOption = this.props.options.filter(option => (option.default))[0];
    const otherOptions = this.props.options.filter(option => (!option.default));
    return (
      <div onBlur={(event) => { this.closeOptions(event) }} className="drc-dropdown-container">
        <Button className="main-button" text={defaultOption.label} onClick={defaultOption.onClick} />
        <Button
          className="dropdown-button"
          text="▼"
          onClick={(event) => {this.toggleOptions(event)}}
        />
        <ul style={optionsStyle} className={optionsClass}>
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
}

DropDown.propTypes ={
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    default: PropTypes.bool
  })).isRequired,
};

export default DropDown;
