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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _maskJs = require('mask-js');

require('./Table.css');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table(props) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    var showLoading = props.data === null || !!props.data.then;
    _this.state = {
      data: props.data,
      showLoading: showLoading
    };
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // when data is a promise
      if (this.state.data && this.state.data.then) {
        this.state.data.then(function (data) {
          _this2.setState({
            data: data,
            showLoading: false
          });
        });
      }
    }
  }, {
    key: 'renderProperty',
    value: function renderProperty(column, record) {
      if (column.renderer) return column.renderer(record);
      var propertyValue = record[column.property];
      if (!propertyValue) return '';
      if (column.type === 'string' && !column.format) return propertyValue;
      if (column.format === 'currency') return (0, _maskJs.maskCurrency)(propertyValue);
      if (column.format === 'date') return (0, _maskJs.maskDate)(propertyValue, 'pt-BR');
      throw new Error('Unexpected state on \'' + column.property + '\' on this record: ' + JSON.stringify(record));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
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
            this.state.data && this.state.data.map && this.state.data.map(function (record, idx) {
              return _react2.default.createElement(
                'tr',
                { key: idx },
                _this3.props.columns.map(function (column, idx) {
                  return _react2.default.createElement(
                    'td',
                    { className: column.columnClass, key: idx },
                    _this3.renderProperty(column, record)
                  );
                })
              );
            })
          )
        ),
        _react2.default.createElement(
          _.If,
          { condition: this.state.showLoading },
          _react2.default.createElement(
            'div',
            { className: 'drc-loading-data' },
            'Loading Data',
            _react2.default.createElement(
              'span',
              null,
              '.'
            )
          )
        ),
        _react2.default.createElement(
          _.If,
          { condition: !this.state.showLoading && this.state.data && this.state.data.length === 0 },
          _react2.default.createElement(
            'div',
            { className: 'drc-no-data' },
            'No Data'
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      if (props.data && props.data.then) return null;
      if (state.data === props.data) return null;

      var showLoading = !!props.data.then;
      return {
        data: props.data,
        showLoading: showLoading
      };
    }
  }]);
  return Table;
}(_react.Component);

Table.propTypes = {
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string.isRequired,
    property: _propTypes2.default.string,
    renderer: _propTypes2.default.func,
    headerClass: _propTypes2.default.string,
    columnClass: _propTypes2.default.string
  })).isRequired,
  data: _propTypes2.default.oneOfType([_propTypes2.default.shape({
    then: _propTypes2.default.func.isRequired,
    catch: _propTypes2.default.func.isRequired
  }), _propTypes2.default.array])
};

exports.default = Table;