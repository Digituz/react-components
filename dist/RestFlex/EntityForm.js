'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EntityForm = function (_Component) {
  _inherits(EntityForm, _Component);

  function EntityForm(props) {
    _classCallCheck(this, EntityForm);

    var _this = _possibleConstructorReturn(this, (EntityForm.__proto__ || Object.getPrototypeOf(EntityForm)).call(this, props));

    _this.state = {
      entity: props.entity
    };
    return _this;
  }

  _createClass(EntityForm, [{
    key: 'render',
    value: function render() {
      console.log(this.state.entity);
      return _react2.default.createElement(
        'p',
        null,
        'good to go'
      );
    }
  }]);

  return EntityForm;
}(_react.Component);

EntityForm.propTypes = {
  entity: _propTypes2.default.instanceOf(Object),
  model: _propTypes2.default.shape({
    url: _propTypes2.default.string.isRequired,
    path: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string.isRequired,
    plural: _propTypes2.default.string.isRequired,
    description: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired,
    properties: _propTypes2.default.object.isRequired
  }).isRequired
};

exports.default = EntityForm;