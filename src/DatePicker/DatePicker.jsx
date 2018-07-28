import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './DatePicker.scss';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');

    const date = props.date ? new Date(props.date) : new Date();

    const year = date.getFullYear();
    const month = date.getMonth();

    this.state = {
      selectedDate: date,
      currentMonth: new Date(year, month, 1),
    };
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    this.el.querySelectorAll('button.default.change-year')[0].focus();
  }

  static getDayOfWeek(day) {
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

  static getMonth(month) {
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

  static getFullMonth(month) {
    switch (month) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
    }
  }

  addMonths(months) {
    const year = this.state.currentMonth.getFullYear();
    const month = this.state.currentMonth.getMonth();
    const date = this.state.currentMonth.getDate();
    const nextMonth = new Date(year, month + months, date);
    this.setState({
      currentMonth: nextMonth,
    });
  }

  changeDate(date) {
    this.setState({
      selectedDate: date,
    });
  }

  render() {
    const selectedMonth = this.state.selectedDate.getMonth();
    const monthLabel = DatePicker.getMonth(selectedMonth);
    const date = this.state.selectedDate.getDate();
    const day = this.state.selectedDate.getDay();
    const dayOfWeek = DatePicker.getDayOfWeek(day);

    const year = this.state.currentMonth.getFullYear();
    const month = this.state.currentMonth.getMonth();

    const firstDateOfMonth = new Date(year, month, 1);
    const firstDayOfMonth = firstDateOfMonth.getDay();
    const firstDateShowed = new Date(year, month, 1);
    firstDateShowed.setDate(firstDateOfMonth.getDate() - firstDayOfMonth);

    const lastDateOfMonth = new Date(year, month + 1);
    lastDateOfMonth.setDate(lastDateOfMonth.getDate() - 1);
    const lastDayOfMonth = lastDateOfMonth.getDay();
    const lastDateShowed = new Date(year, month + 1);
    lastDateShowed.setDate(lastDateShowed.getDate() - 1);
    lastDateShowed.setDate(lastDateOfMonth.getDate() + 7 - lastDayOfMonth);

    let dateIterator = firstDateShowed;
    const days = [];
    while (days.length < 42) {
      days.push(new Date(dateIterator.getTime()));
      dateIterator.setDate(dateIterator.getDate() + 1);
    }

    const modal = (
      <div onClick={this.props.onCancel} className="drc-date-picker-overlay">
        <div onClick={evt => (evt.stopPropagation())} className="drc-date-picker-container">
          <div className="selected-date">
            <span className="year">{year}</span><br/>
            <span>{dayOfWeek}, {monthLabel} {date}</span>
          </div>
          <div className="control">
            <Button text="«" onClick={() => {this.addMonths(-12)}} className="default change-year" />
            <Button text="‹" onClick={() => {this.addMonths(-1)}} className="default change-month" />
            <span>{DatePicker.getFullMonth(month)} {year}</span>
            <Button text="›" onClick={() => {this.addMonths(1)}} className="default change-month" />
            <Button text="»" onClick={() => {this.addMonths(12)}} className="default change-year" />
          </div>
          <div className="calendar">
            <div className="header">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            { days.map((date) => {
              let className = ``;
              if (date.getMonth() !== month) className = 'out-of-month';
              return (
                <span onClick={() => (this.changeDate(date))} key={date.getTime()} className={className}>{date.getDate()}</span>
              );
            })}
          </div>
          <div className="actions">
            <Button text="Cancel" onClick={this.props.onCancel} className="default" />
            <Button text="Clear" onClick={() => (this.props.onOk(null))} className="default" />
            <Button text="Ok" onClick={() => (this.props.onOk(this.state.selectedDate))} className="info" />
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
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
};

DatePicker.defaultProps = {
  date: new Date(),
};

export default DatePicker;
