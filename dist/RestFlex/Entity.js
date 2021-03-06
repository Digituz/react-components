'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  url: _propTypes2.default.string.isRequired,
  audience: _propTypes2.default.string.isRequired,
  domain: _propTypes2.default.string.isRequired,
  path: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string.isRequired,
  plural: _propTypes2.default.string.isRequired,
  description: _propTypes2.default.string.isRequired,
  properties: _propTypes2.default.shape({
    columnClass: _propTypes2.default.string,
    format: _propTypes2.default.string,
    headerClass: _propTypes2.default.string,
    label: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    placeholder: _propTypes2.default.string,
    render: _propTypes2.default.func
  }).isRequired
};