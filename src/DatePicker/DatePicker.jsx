import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './DatePicker.scss';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  static getDayOfWeek(date) {
    const day = date.getDay();
    switch (day) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    }
  }

  static getMonth(date) {
    const month = date.getMonth();
    switch (month) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sept';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
    }
  }

  render() {
    const year = this.props.date.getFullYear();
    const month = DatePicker.getMonth(this.props.date);
    const date = this.props.date.getDate();
    const dayOfWeek = DatePicker.getDayOfWeek(this.props.date);

    const modal = (
      <div className="drc-date-picker-overlay">
        <div className="drc-date-picker-container">
          <div className="selected-date">
            <span className="year">{year}</span><br/>
            <span>{dayOfWeek}, {month} {date}</span>
          </div>
          <div className="calendar">

          </div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(
      modal,
      this.el,
    );
  }
}

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
};

DatePicker.defaultProps = {
  date: new Date(),
};

export default DatePicker;
