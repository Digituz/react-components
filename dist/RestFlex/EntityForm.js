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

var _FileManager = require('../FileManager/FileManager');

var _FileManager2 = _interopRequireDefault(_FileManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityForm = function (_Component) {
  _inherits(EntityForm, _Component);

  function EntityForm(props) {
    _classCallCheck(this, EntityForm);

    var _this = _possibleConstructorReturn(this, (EntityForm.__proto__ || Object.getPrototypeOf(EntityForm)).call(this, props));

    var entity = {};

    Object.keys(props.model.properties).forEach(function (propertyKey) {
      var property = _this.props.model.properties[propertyKey];
      if (property.format === 'date') {
        return entity[propertyKey] = new Date();
      }
      entity[propertyKey] = '';
    });

    _this.state = {
      id: null,
      entity: entity
    };

    _this.updateField = _this.updateField.bind(_this);

    var _this$props$model = _this.props.model,
        url = _this$props$model.url,
        audience = _this$props$model.audience,
        domain = _this$props$model.domain;

    _this.client = new _restFlexClient2.default(url, audience, domain, props.auth0Config);
    return _this;
  }

  _createClass(EntityForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var id = this.props.match.params.id;
      if (id.trim() === 'new') return;
      this.client.get(id).then(function (entity) {
        _this2.setState({
          id: id,
          entity: entity
        });
      });
    }
  }, {
    key: 'updateField',
    value: function updateField(property) {
      var _this3 = this;

      return function (value) {
        _this3.setState({
          entity: _extends({}, _this3.state.entity, _defineProperty({}, property, value))
        });
      };
    }
  }, {
    key: 'getValue',
    value: function getValue(propertyKey, format) {
      if (format === 'number') return this.state.entity[propertyKey] || 0;
      return this.state.entity[propertyKey] || '';
    }
  }, {
    key: 'getFieldFromProperty',
    value: function getFieldFromProperty(propertyKey) {
      var property = this.props.model.properties[propertyKey];
      if (property.type === 'string' || property.type === 'number') {
        return _react2.default.createElement(
          'div',
          { className: 'sm-12', key: propertyKey },
          _react2.default.createElement(_.InputLabel, {
            inputId: propertyKey,
            label: property.label,
            placeholder: property.placeholder,
            value: this.getValue(propertyKey, property.format),
            onBlur: this.updateField(propertyKey),
            type: property.format || 'text',
            inputType: property.inputType
          })
        );
      }
      if (property.type === 'file') {
        return _react2.default.createElement(
          'div',
          { className: 'sm-12', key: propertyKey },
          _react2.default.createElement(_FileManager2.default, {
            id: propertyKey,
            onComplete: this.updateField(propertyKey)
          })
        );
      }
      return null;
    }
  }, {
    key: 'save',
    value: function save() {
      var _this4 = this;

      if (this.state.id) {
        this.client.update(this.state.id, this.state.entity).then(function () {
          _this4.props.history.push(_this4.props.model.path);
          _.NotificationManager.success(_this4.props.model.plural + ' updated successfully.');
        }).catch(function (err) {
          if (err.message && typeof err.message === 'string') return _.NotificationManager.danger(err.message);
          _.NotificationManager.danger('Something went wrong.');
        });
        return;
      }
      this.client.insert(this.state.entity).then(function () {
        _this4.props.history.push(_this4.props.model.path);
        _.NotificationManager.success(_this4.props.model.plural + ' inserted successfully.');
      }).catch(function (err) {
        if (err.message && typeof err.message === 'string') return _.NotificationManager.danger(err.message);
        _.NotificationManager.danger('Something went wrong.');
      });
    }
  }, {
    key: 'goBack',
    value: function goBack() {
      this.props.history.goBack();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var properties = Object.keys(this.props.model.properties);
      var fields = properties.map(function (property) {
        return _this5.getFieldFromProperty(property);
      });

      return _react2.default.createElement(
        _.Card,
        {
          className: 'sm-12 md-10 md-pad-1 lg-8 lg-pad-2',
          title: this.props.model.title },
        _react2.default.createElement(
          _.Grid,
          null,
          fields.map(function (field) {
            return field;
          }),
          _react2.default.createElement(
            'div',
            { className: 'sm-12' },
            _react2.default.createElement(_.Button, { className: 'margin-right', onClick: function onClick() {
                _this5.save();
              }, text: 'Save' }),
            _react2.default.createElement(_.Button, { className: 'default', onClick: function onClick() {
                _this5.goBack();
              }, text: 'Return' })
          )
        )
      );
    }
  }]);

  return EntityForm;
}(_react.Component);

EntityForm.propTypes = {
  auth0Config: _propTypes2.default.shape({
    domain: _propTypes2.default.string.isRequired,
    clientID: _propTypes2.default.string.isRequired,
    redirectUri: _propTypes2.default.string.isRequired
  }).isRequired,
  model: _propTypes2.default.shape(_Entity2.default).isRequired
};

exports.default = (0, _reactRouterDom.withRouter)(EntityForm);