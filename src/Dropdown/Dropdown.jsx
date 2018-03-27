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

  closeOptions(event) {
    console.log(event.target);
    if (!this.state.optionsVisible) return;
    this.setState({
      optionsVisible: false,
    });
  }

  saySomething() {
    console.log('something');
  }

  render() {
    const optionsClass = `drc-dropdown-options ${this.state.optionsVisible ? 'visible' : ''}`;
    return (
      <div onBlur={(event) => { this.closeOptions(event) }} className="drc-dropdown-container">
        <Button className="main-button" text="Edit" onClick={() => {}} />
        <Button className="dropdown-button" text="v" onClick={() => {this.toggleOptions()}} />
        <ul className={optionsClass}>
          <li onClick={() => { this.saySomething() }}>Copy</li>
          <li onClick={() => { this.saySomething() }}>Delete</li>
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes ={

};

export default Dropdown;
