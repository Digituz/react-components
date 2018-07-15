'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var _FileManager = require('../FileManager/FileManager');

var _FileManager2 = _interopRequireDefault(_FileManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityForm = function (_Component) {
  (0, _inherits3.default)(EntityForm, _Component);

  function EntityForm(props) {
    (0, _classCallCheck3.default)(this, EntityForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EntityForm.__proto__ || Object.getPrototypeOf(EntityForm)).call(this, props));

    var entity = {};

    Object.keys(props.model.properties).forEach(function (propertyKey) {
      var property = _this.props.model.properties[propertyKey];
      if (property.format === 'date') {
        return entity[propertyKey] = new Date();
      }
      if (property.type === 'file') {
        return entity[propertyKey] = [];
      }
      entity[propertyKey] = '';
    });

    _this.state = {
      id: null,
      entity: entity
    };

    _this.updateField = _this.updateField.bind(_this);

    var url = _this.props.model.url;


    _this.client = new _restFlexClient2.default(url, _this.props.accessToken);
    return _this;
  }

  (0, _createClass3.default)(EntityForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var id = this.props.entityId;
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
          entity: (0, _extends4.default)({}, _this3.state.entity, (0, _defineProperty3.default)({}, property, value))
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
            accessKeyId: this.props.fileManagerConfig.accessKeyId,
            bucketName: this.props.fileManagerConfig.bucketName,
            endpoint: this.props.fileManagerConfig.endpoint,
            files: this.getValue(propertyKey),
            id: propertyKey,
            label: property.label,
            multiple: property.multiple || false,
            onComplete: this.updateField(propertyKey),
            secretAccessKey: this.props.fileManagerConfig.secretAccessKey
          })
        );
      }
      return null;
    }
  }, {
    key: 'save',
    value: function save() {
      var _this4 = this;

      // removing files that were not uploaded
      var propertyKeys = Object.keys(this.props.model.properties);
      propertyKeys.forEach(function (propertyKey) {
        var property = _this4.props.model.properties[propertyKey];
        if (property.type === 'file') {
          var files = _this4.state.entity[propertyKey];
          if (!files) return delete _this4.state.entity[propertyKey];
          _this4.state.entity[propertyKey] = files.filter(function (file) {
            return file.uploaded;
          });
        }
      });

      if (this.state.id) {
        this.client.update(this.state.id, this.state.entity).then(function (res) {
          if (res.status === 401) {
            return _.NotificationManager.danger('You are not authorized to update this entity.');
          }
          if (res.status > 400) {
            console.log(res);
            return _.NotificationManager.danger('Something went wrong.');
          }
          _this4.props.navigate(_this4.props.model.path);
          _.NotificationManager.success(_this4.props.model.plural + ' updated successfully.');
        }).catch(function (err) {
          if (err.message && typeof err.message === 'string') return _.NotificationManager.danger(err.message);
          _.NotificationManager.danger('Something went wrong.');
        });
        return;
      }
      this.client.insert(this.state.entity).then(function (res) {
        if (res.status === 401) {
          return _.NotificationManager.danger('You are not authorized to insert a new entity.');
        }
        if (res.status > 400) {
          console.log(res);
          return _.NotificationManager.danger('Something went wrong.');
        }
        _this4.props.navigate(_this4.props.model.path);
        _.NotificationManager.success(_this4.props.model.plural + ' inserted successfully.');
      }).catch(function (err) {
        if (err.message && typeof err.message === 'string') return _.NotificationManager.danger(err.message);
        _.NotificationManager.danger('Something went wrong.');
      });
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
            _react2.default.createElement(_.Button, { className: 'default', onClick: this.props.goBack, text: 'Return' })
          )
        )
      );
    }
  }]);
  return EntityForm;
}(_react.Component);

EntityForm.propTypes = {
  accessToken: _propTypes2.default.string.isRequired,
  entityId: _propTypes2.default.string.isRequired,
  goBack: _propTypes2.default.func.isRequired,
  model: _propTypes2.default.shape(_Entity2.default).isRequired,
  navigate: _propTypes2.default.func.isRequired,
  fileManagerConfig: _propTypes2.default.shape({
    accessKeyId: _propTypes2.default.string.isRequired,
    bucketName: _propTypes2.default.string.isRequired,
    endpoint: _propTypes2.default.string.isRequired,
    secretAccessKey: _propTypes2.default.string.isRequired
  })
};

exports.default = EntityForm;