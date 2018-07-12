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

var _EntityForm = require('./EntityForm');

var _EntityForm2 = _interopRequireDefault(_EntityForm);

var _EntityList = require('./EntityList');

var _EntityList2 = _interopRequireDefault(_EntityList);

var _Entity = require('./Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RestFlexRoute = function (_Component) {
  (0, _inherits3.default)(RestFlexRoute, _Component);

  function RestFlexRoute() {
    (0, _classCallCheck3.default)(this, RestFlexRoute);
    return (0, _possibleConstructorReturn3.default)(this, (RestFlexRoute.__proto__ || Object.getPrototypeOf(RestFlexRoute)).apply(this, arguments));
  }

  (0, _createClass3.default)(RestFlexRoute, [{
    key: 'showList',
    value: function showList() {
      return _react2.default.createElement(_EntityList2.default, {
        accessToken: this.props.accessToken,
        model: this.props.model,
        navigate: this.props.navigate,
        tableColumns: this.props.tableColumns
      });
    }
  }, {
    key: 'showForm',
    value: function showForm() {
      return _react2.default.createElement(_EntityForm2.default, {
        accessToken: this.props.accessToken,
        entityId: this.props.entityId,
        goBack: this.props.goBack,
        model: this.props.model,
        navigate: this.props.navigate,
        fileManagerConfig: this.props.fileManagerConfig
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.entityId) return this.showList();
      return this.showForm();
    }
  }]);
  return RestFlexRoute;
}(_react.Component);

RestFlexRoute.propTypes = {
  accessToken: _propTypes2.default.string.isRequired,
  entityId: _propTypes2.default.string,
  goBack: _propTypes2.default.func.isRequired,
  model: _propTypes2.default.shape(_Entity2.default).isRequired,
  navigate: _propTypes2.default.func.isRequired,
  tableColumns: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  fileManagerConfig: _propTypes2.default.shape({
    accessKeyId: _propTypes2.default.string.isRequired,
    bucketName: _propTypes2.default.string.isRequired,
    endpoint: _propTypes2.default.string.isRequired,
    secretAccessKey: _propTypes2.default.string.isRequired
  })
};

exports.default = RestFlexRoute;