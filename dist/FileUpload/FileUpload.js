'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var AWS = _interopRequireWildcard(_awsSdk);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _maskJs = require('mask-js');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../');

require('./FileUpload.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUpload = function (_Component) {
  _inherits(FileUpload, _Component);

  function FileUpload() {
    _classCallCheck(this, FileUpload);

    var _this = _possibleConstructorReturn(this, (FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call(this));

    _this.fileUpload = _react2.default.createRef();

    _this.state = {
      files: []
    };
    return _this;
  }

  _createClass(FileUpload, [{
    key: 'openFileChooser',
    value: function openFileChooser() {
      console.log(this.fileUpload);
      this.fileUpload.current.click();
    }
  }, {
    key: 'fileChosen',
    value: function fileChosen() {
      var files = [].concat(_toConsumableArray(this.fileUpload.current.files));
      this.setState({
        files: files
      });
    }
  }, {
    key: 'uploadFiles',
    value: function uploadFiles() {
      var accessKeyId = 'TKPLAKLR23UMLNYEVV24';
      var secretAccessKey = 'Wbt7tJSEPwytAHZ2dnS4YbSPS1TbDBGBNQ78xlFKtWo';
      var region = 'nyc3'; // New York region by default

      var spacesEndpoint = new AWS.Endpoint(region + '.digitaloceanspaces.com');
      var s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      });

      var options = {
        partSize: 10 * 1024 * 1024, // 10 MB
        queueSize: 10
      };

      var uploadEvents = this.state.files.map(function (file) {
        var params = {
          ACL: 'public-read',
          Bucket: 'brand-house',
          Key: file.name,
          Body: file
        };
        return s3.upload(params, options).promise();
      });

      console.log(uploadEvents);

      Promise.all(uploadEvents).then(function (values) {
        console.log('good to go');
      });
    }
  }, {
    key: 'clearList',
    value: function clearList() {
      var files = this.state.files.filter(function (file) {
        return null;
      });

      this.fileUpload.current.value = '';

      this.setState({
        files: files
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'drc-file-upload' },
        _react2.default.createElement('input', {
          type: 'file',
          ref: this.fileUpload,
          onChange: function onChange() {
            return _this2.fileChosen();
          },
          id: this.props.id,
          multiple: true
        }),
        _react2.default.createElement(_.Button, {
          onClick: function onClick() {
            return _this2.openFileChooser();
          },
          text: 'Choose Files'
        }),
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { colSpan: 2 },
                'Files Chosen'
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Name'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Size'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.state.files.map(function (file) {
              return _react2.default.createElement(
                'tr',
                { key: file.name },
                _react2.default.createElement(
                  'td',
                  null,
                  file.name
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  (0, _maskJs.maskCurrency)(file.size / 1024),
                  ' KB'
                )
              );
            }),
            this.state.files.length < 1 && _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { colSpan: 2 },
                'No files chosen.'
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'a',
                  { onClick: function onClick() {
                      return _this2.uploadFiles();
                    } },
                  'Upload'
                )
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'a',
                  { onClick: function onClick() {
                      return _this2.clearList();
                    } },
                  'Clear'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return FileUpload;
}(_react.Component);

FileUpload.propTypes = {
  id: _propTypes2.default.string.isRequired,
  onStart: _propTypes2.default.func,
  onComplete: _propTypes2.default.func,
  onError: _propTypes2.default.func
};

exports.default = FileUpload;