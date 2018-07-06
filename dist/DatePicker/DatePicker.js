'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

require('./DatePicker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function (_Component) {
  (0, _inherits3.default)(DatePicker, _Component);

  function DatePicker(props) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

    _this.el = document.createElement('div');

    var year = props.date.getFullYear();
    var month = props.date.getMonth();

    _this.state = {
      selectedDate: props.date,
      currentMonth: new Date(year, month, 1)
    };
    return _this;
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.appendChild(this.el);
      this.el.querySelectorAll('button.default.change-year')[0].focus();
    }
  }, {
    key: 'addMonths',
    value: function addMonths(months) {
      var year = this.state.currentMonth.getFullYear();
      var month = this.state.currentMonth.getMonth();
      var date = this.state.currentMonth.getDate();
      var nextMonth = new Date(year, month + months, date);
      this.setState({
        currentMonth: nextMonth
      });
    }
  }, {
    key: 'changeDate',
    value: function changeDate(date) {
      this.setState({
        selectedDate: date
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var selectedMonth = this.state.selectedDate.getMonth();
      var monthLabel = DatePicker.getMonth(selectedMonth);
      var date = this.state.selectedDate.getDate();
      var day = this.state.selectedDate.getDay();
      var dayOfWeek = DatePicker.getDayOfWeek(day);

      var year = this.state.currentMonth.getFullYear();
      var month = this.state.currentMonth.getMonth();

      var firstDateOfMonth = new Date(year, month, 1);
      var firstDayOfMonth = firstDateOfMonth.getDay();
      var firstDateShowed = new Date(year, month, 1);
      firstDateShowed.setDate(firstDateOfMonth.getDate() - firstDayOfMonth);

      var lastDateOfMonth = new Date(year, month + 1);
      lastDateOfMonth.setDate(lastDateOfMonth.getDate() - 1);
      var lastDayOfMonth = lastDateOfMonth.getDay();
      var lastDateShowed = new Date(year, month + 1);
      lastDateShowed.setDate(lastDateShowed.getDate() - 1);
      lastDateShowed.setDate(lastDateOfMonth.getDate() + 7 - lastDayOfMonth);

      var dateIterator = firstDateShowed;
      var days = [];
      while (days.length < 42) {
        days.push(new Date(dateIterator.getTime()));
        dateIterator.setDate(dateIterator.getDate() + 1);
      }

      var modal = _react2.default.createElement(
        'div',
        { onClick: this.props.onCancel, className: 'drc-date-picker-overlay' },
        _react2.default.createElement(
          'div',
          { onClick: function onClick(evt) {
              return evt.stopPropagation();
            }, className: 'drc-date-picker-container' },
          _react2.default.createElement(
            'div',
            { className: 'selected-date' },
            _react2.default.createElement(
              'span',
              { className: 'year' },
              year
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'span',
              null,
              dayOfWeek,
              ', ',
              monthLabel,
              ' ',
              date
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'control' },
            _react2.default.createElement(_Button2.default, { text: '\xAB', onClick: function onClick() {
                _this2.addMonths(-12);
              }, className: 'default change-year' }),
            _react2.default.createElement(_Button2.default, { text: '\u2039', onClick: function onClick() {
                _this2.addMonths(-1);
              }, className: 'default change-month' }),
            _react2.default.createElement(
              'span',
              null,
              DatePicker.getFullMonth(month),
              ' ',
              year
            ),
            _react2.default.createElement(_Button2.default, { text: '\u203A', onClick: function onClick() {
                _this2.addMonths(1);
              }, className: 'default change-month' }),
            _react2.default.createElement(_Button2.default, { text: '\xBB', onClick: function onClick() {
                _this2.addMonths(12);
              }, className: 'default change-year' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'calendar' },
            _react2.default.createElement(
              'div',
              { className: 'header' },
              _react2.default.createElement(
                'span',
                null,
                'S'
              ),
              _react2.default.createElement(
                'span',
                null,
                'M'
              ),
              _react2.default.createElement(
                'span',
                null,
                'T'
              ),
              _react2.default.createElement(
                'span',
                null,
                'W'
              ),
              _react2.default.createElement(
                'span',
                null,
                'T'
              ),
              _react2.default.createElement(
                'span',
                null,
                'F'
              ),
              _react2.default.createElement(
                'span',
                null,
                'S'
              )
            ),
            days.map(function (date) {
              var className = '';
              if (date.getMonth() !== month) className = 'out-of-month';
              return _react2.default.createElement(
                'span',
                { onClick: function onClick() {
                    return _this2.changeDate(date);
                  }, key: date.getTime(), className: className },
                date.getDate()
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'actions' },
            _react2.default.createElement(_Button2.default, { text: 'Cancel', onClick: this.props.onCancel, className: 'default' }),
            _react2.default.createElement(_Button2.default, { text: 'Ok', onClick: function onClick() {
                return _this2.props.onOk(_this2.state.selectedDate);
              }, className: 'info' })
          )
        )
      );

      return _reactDom2.default.createPortal(modal, this.el);
    }
  }], [{
    key: 'getDayOfWeek',
    value: function getDayOfWeek(day) {
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
  }, {
    key: 'getMonth',
    value: function getMonth(month) {
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
  }, {
    key: 'getFullMonth',
    value: function getFullMonth(month) {
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
  }]);
  return DatePicker;
}(_react.Component);

DatePicker.propTypes = {
  onCancel: _propTypes2.default.func.isRequired,
  onOk: _propTypes2.default.func.isRequired,
  date: _propTypes2.default.instanceOf(Date)
};

DatePicker.defaultProps = {
  date: new Date()
};

exports.default = DatePicker;