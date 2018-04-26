'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _restFlexClient = require('@digituz/rest-flex-client');

var _restFlexClient2 = _interopRequireDefault(_restFlexClient);

var _ = require('../');

var _Entity = require('./Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityList = function (_Component) {
  _inherits(EntityList, _Component);

  function EntityList(props) {
    _classCallCheck(this, EntityList);

    var _this = _possibleConstructorReturn(this, (EntityList.__proto__ || Object.getPrototypeOf(EntityList)).call(this, props));

    var _this$props$model = _this.props.model,
        url = _this$props$model.url,
        audience = _this$props$model.audience,
        domain = _this$props$model.domain;

    _this.client = new _restFlexClient2.default(url, audience, domain, props.auth0Config);

    _this.state = {
      data: []
    };
    return _this;
  }

  _createClass(EntityList, [{
    key: 'newEntity',
    value: function newEntity() {
      this.props.history.push(this.props.model.path + '/new');
    }
  }, {
    key: 'editEntity',
    value: function editEntity(entity) {
      this.props.history.push(this.props.model.path + '/' + entity._id);
    }
  }, {
    key: 'deleteEntity',
    value: function deleteEntity(entity) {
      var _this2 = this;

      this.client.remove(entity._id).then(function () {
        _this2.props.history.push(_this2.props.model.path);
        _.NotificationManager.success(_this2.props.model.title + ' removed successfully.');
        _this2.loadEntities();
      }).catch(function (err) {
        if (err.message && typeof err.message === 'string') return _.NotificationManager.danger(err.message);
        _.NotificationManager.danger('Something went wrong.');
      });
    }
  }, {
    key: 'loadEntities',
    value: function loadEntities() {
      var data = this.client.get();
      this.setState({
        data: data
      });
    }
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
        return _extends({}, property, {
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
  auth0Config: _propTypes2.default.shape({
    domain: _propTypes2.default.string.isRequired,
    clientID: _propTypes2.default.string.isRequired,
    redirectUri: _propTypes2.default.string.isRequired
  }).isRequired,
  model: _propTypes2.default.shape(_Entity2.default).isRequired,
  tableColumns: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
};

exports.default = (0, _reactRouterDom.withRouter)(EntityList);