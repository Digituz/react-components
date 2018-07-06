'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _restFlexClient = require('@digituz/rest-flex-client');

var _restFlexClient2 = _interopRequireDefault(_restFlexClient);

var _ = require('../');

var _Entity = require('./Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityList = function (_Component) {
  (0, _inherits3.default)(EntityList, _Component);

  function EntityList(props) {
    (0, _classCallCheck3.default)(this, EntityList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EntityList.__proto__ || Object.getPrototypeOf(EntityList)).call(this, props));

    var url = _this.props.model.url;

    _this.client = new _restFlexClient2.default(url, _this.props.accessToken);

    _this.state = {
      data: null
    };
    return _this;
  }

  (0, _createClass3.default)(EntityList, [{
    key: 'newEntity',
    value: function newEntity() {
      this.props.navigate(this.props.model.path, 'new');
    }
  }, {
    key: 'editEntity',
    value: function editEntity(entity) {
      this.props.navigate(this.props.model.path, entity._id);
    }
  }, {
    key: 'deleteEntity',
    value: function deleteEntity(entity) {
      var _this2 = this;

      this.client.remove(entity._id).then(function (res) {
        if (res.status === 401) {
          return _.NotificationManager.danger('You are not authorized to remove this entity.');
        }
        if (res.status > 400) {
          console.log(res);
          return _.NotificationManager.danger('Something went wrong.');
        }
        _.NotificationManager.success(_this2.props.model.title + ' removed successfully.');
        _this2.loadEntities();
      }).catch(function (err) {
        if (err.message && typeof err.message === 'string') return _.NotificationManager.danger(err.message);
        _.NotificationManager.danger('Something went wrong.');
      });
    }
  }, {
    key: 'loadEntities',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.client.get();

              case 2:
                data = _context.sent;

                this.setState({
                  data: data
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadEntities() {
        return _ref.apply(this, arguments);
      }

      return loadEntities;
    }()
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadEntities();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var columns = this.props.tableColumns.map(function (col) {
        var property = _this3.props.model.properties[col];
        return (0, _extends3.default)({}, property, {
          columnClass: property.format || '',
          property: col
        });
      });

      columns.push({
        label: 'Actions',
        columnClass: 'actions',
        renderer: function renderer(entity) {
          var dropDownOptions = [{ label: 'Edit', default: true, onClick: function onClick() {
              _this3.editEntity(entity);
            } }, { label: 'Delete', onClick: function onClick() {
              _this3.deleteEntity(entity);
            } }];
          return _react2.default.createElement(_.DropDown, { options: dropDownOptions });
        }
      });

      return _react2.default.createElement(
        _.Card,
        { className: 'sm-12 lg-10 lg-pad-1', title: this.props.model.plural },
        _react2.default.createElement(
          'p',
          null,
          this.props.model.description
        ),
        _react2.default.createElement(_.Button, { onClick: function onClick() {
            _this3.newEntity();
          }, text: 'New ' + this.props.model.title }),
        _react2.default.createElement(_.Table, { data: this.state.data, columns: columns })
      );
    }
  }]);
  return EntityList;
}(_react.Component);

EntityList.propTypes = {
  accessToken: _propTypes2.default.string.isRequired,
  model: _propTypes2.default.shape(_Entity2.default).isRequired,
  navigate: _propTypes2.default.func.isRequired,
  tableColumns: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
};

exports.default = EntityList;