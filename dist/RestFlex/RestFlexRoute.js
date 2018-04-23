'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EntityForm = require('./EntityForm');

var _EntityForm2 = _interopRequireDefault(_EntityForm);

var _EntityList = require('./EntityList');

var _EntityList2 = _interopRequireDefault(_EntityList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RestFlexRoute = function (_Component) {
  _inherits(RestFlexRoute, _Component);

  function RestFlexRoute() {
    _classCallCheck(this, RestFlexRoute);

    return _possibleConstructorReturn(this, (RestFlexRoute.__proto__ || Object.getPrototypeOf(RestFlexRoute)).apply(this, arguments));
  }

  _createClass(RestFlexRoute, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log(this.props.model.path);
      return _react2.default.createElement(
        _react.Fragment,
        { key: this.props.model.path },
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.model.path, render: function render() {
            console.log('rendering list');
            return _react2.default.createElement(_EntityList2.default, { model: _this2.props.model, columns: _this2.props.columns });
          } }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.model.path + '/:id', render: function render() {
            console.log('rendering form');
            return _react2.default.createElement(_EntityForm2.default, { model: _this2.props.model, entity: {} });
          } })
      );
    }
  }]);

  return RestFlexRoute;
}(_react.Component);

RestFlexRoute.propTypes = {
  model: _propTypes2.default.shape({
    url: _propTypes2.default.string.isRequired,
    path: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string.isRequired,
    plural: _propTypes2.default.string.isRequired,
    description: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired,
    properties: _propTypes2.default.object.isRequired
  }).isRequired,
  columns: _propTypes2.default.array.isRequired
};

exports.default = RestFlexRoute;