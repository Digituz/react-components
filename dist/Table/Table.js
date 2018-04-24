'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maskJs = require('mask-js');

require('./Table.css');

var _Entity = require('../RestFlex/Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.state = {
      data: props.data
    };
    return _this;
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // when data is a promise
      if (this.state.data.then) {
        this.state.data.then(function (data) {
          _this2.setState({
            data: data
          });
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (this.props.data !== nextProps.data) {
        if (nextProps.data.then) {
          nextProps.data.then(function (data) {
            _this3.setState({
              data: data
            });
          });
          return;
        }
        this.setState({
          data: nextProps.data
        });
      }
    }
  }, {
    key: 'renderProperty',
    value: function renderProperty(property, record) {
      var propertyValue = record[property];
      if (!propertyValue) return '';
      if (typeof propertyValue === 'string') return propertyValue;
      if (typeof propertyValue.getMonth === 'function') return (0, _maskJs.maskDate)(propertyValue, 'pt-BR');
      throw new Error('Unexpected state on \'' + property + '\' on this record: ' + JSON.stringify(record));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'table',
        { className: 'drc-table' },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            this.props.columns.map(function (column, idx) {
              return _react2.default.createElement(
                'th',
                { className: column.headerClass, key: idx },
                column.label
              );
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          this.state.data.map && this.state.data.map(function (record, idx) {
            return _react2.default.createElement(
              'tr',
              { key: idx },
              _this4.props.columns.map(function (column, idx) {
                return _react2.default.createElement(
                  'td',
                  { className: column.columnClass, key: idx },
                  _this4.renderProperty(column.property, record)
                );
              })
            );
          })
        )
      );
    }
  }]);

  return Table;
}(_react.Component);

Table.propTypes = {
  columns: _propTypes2.default.arrayOf(_Entity2.default.properties).isRequired,
  data: _propTypes2.default.oneOfType([_propTypes2.default.shape({
    then: _propTypes2.default.func.isRequired,
    catch: _propTypes2.default.func.isRequired
  }), _propTypes2.default.array]).isRequired
};

exports.default = Table;