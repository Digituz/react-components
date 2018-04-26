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

require('./FileManager.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var accessKeyId = 'TKPLAKLR23UMLNYEVV24';
var secretAccessKey = 'Wbt7tJSEPwytAHZ2dnS4YbSPS1TbDBGBNQ78xlFKtWo';
var endpoint = 'nyc3.digitaloceanspaces.com';
var bucketName = 'brand-house';

var FileManager = function (_Component) {
  _inherits(FileManager, _Component);

  function FileManager(props) {
    _classCallCheck(this, FileManager);

    var _this = _possibleConstructorReturn(this, (FileManager.__proto__ || Object.getPrototypeOf(FileManager)).call(this, props));

    _this.fileManager = _react2.default.createRef();

    _this.state = {
      files: [],
      snapshot: {
        visible: false,
        y: 0,
        x: 0,
        url: '',
        mimeType: ''
      },
      showUploadButton: false
    };

    _this.doSpaces = new AWS.S3({
      endpoint: new AWS.Endpoint(endpoint),
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    });
    return _this;
  }

  _createClass(FileManager, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unmounted = false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
    }
  }, {
    key: 'openFileChooser',
    value: function openFileChooser() {
      this.fileManager.current.click();
    }
  }, {
    key: 'fileChosen',
    value: function fileChosen() {
      var filesUploaded = this.state.files.filter(function (file) {
        return file.uploaded;
      });
      var newFiles = [].concat(_toConsumableArray(this.fileManager.current.files)).map(function (file) {
        var randomDir = new Date().getTime();
        file.spacesName = randomDir + '/' + file.name;
        return file;
      });

      this.setState({
        files: [].concat(_toConsumableArray(filesUploaded), _toConsumableArray(newFiles)),
        showUploadButton: filesUploaded.length + newFiles.length > 0
      });
    }
  }, {
    key: 'uploadFiles',
    value: function uploadFiles() {
      var _this2 = this;

      var options = {
        partSize: 10 * 1024 * 1024, // 10 MB
        queueSize: 10
      };

      var uploadEvents = this.state.files.map(function (file) {
        if (file.uploaded) return null;

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Key: file.spacesName,
          Body: file
        };
        var uploadManager = _this2.doSpaces.upload(params, options);

        uploadManager.on('httpUploadProgress', function (progress) {
          if (_this2.unmounted) return;

          var files = _this2.state.files.map(function (fileIter) {
            if (file.name === fileIter.name && file.size === fileIter.size) {
              return {
                name: file.name,
                spacesName: file.spacesName,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate,
                progress: progress.loaded / progress.total * 100
              };
            }
            return fileIter;
          });

          _this2.setState({
            files: [].concat(_toConsumableArray(files))
          });
        });

        return uploadManager.promise();
      });

      var a = Promise.all(uploadEvents).then(function () {
        if (_this2.unmounted) return;

        var files = _this2.state.files.map(function (file) {
          delete file.progress;
          file.uploaded = true;
          return file;
        });

        _this2.props.onComplete(files);
      });
      console.log(a.reject);
    }
  }, {
    key: 'clearList',
    value: function clearList() {
      var files = this.state.files.filter(function (file) {
        return null;
      });

      this.fileManager.current.value = '';

      this.props.onComplete(files);
    }
  }, {
    key: 'showSnapshot',
    value: function showSnapshot(event, file) {
      this.setState({
        snapshot: {
          visible: true,
          url: 'https://' + bucketName + '.' + endpoint + '/' + file.spacesName,
          mimeType: file.type
        }
      });
    }
  }, {
    key: 'closeSnapshot',
    value: function closeSnapshot() {
      this.setState({
        snapshot: {
          visible: false,
          url: '',
          mimeType: ''
        }
      });
    }
  }, {
    key: 'renderFileName',
    value: function renderFileName(file) {
      var _this3 = this;

      var fileName = file.name;
      if (file.uploaded) {
        fileName = _react2.default.createElement(
          'a',
          {
            target: '_blank',
            onClick: function onClick(event) {
              return _this3.showSnapshot(event, file);
            }
          },
          file.name
        );
      }
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        fileName,
        file.progress && _react2.default.createElement(
          'span',
          null,
          ' (',
          (0, _maskJs.maskCurrency)(file.progress),
          ' %)'
        )
      );
    }
  }, {
    key: 'removeFile',
    value: function removeFile(removedFile) {
      var files = this.state.files.filter(function (file) {
        return file.spacesName !== removedFile.spacesName;
      });
      this.props.onComplete(files);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var totalSize = 0;
      return _react2.default.createElement(
        'div',
        { className: 'drc-file-upload' },
        _react2.default.createElement('input', {
          type: 'file',
          ref: this.fileManager,
          onChange: function onChange() {
            return _this4.fileChosen();
          },
          id: this.props.id,
          multiple: true
        }),
        _react2.default.createElement(_.Button, {
          onClick: function onClick() {
            return _this4.openFileChooser();
          },
          text: 'Choose Files'
        }),
        _react2.default.createElement(
          _.If,
          { condition: this.state.showUploadButton },
          _react2.default.createElement(_.Button, {
            className: 'upload-button',
            onClick: function onClick() {
              return _this4.uploadFiles();
            },
            text: 'Upload Files'
          })
        ),
        _react2.default.createElement(
          _.If,
          { condition: this.state.snapshot.visible },
          _react2.default.createElement(
            _.Modal,
            { onSuccess: function onSuccess() {
                return _this4.closeSnapshot();
              } },
            _react2.default.createElement(
              _.If,
              { condition: this.state.snapshot.mimeType.indexOf('image/') === 0 },
              _react2.default.createElement('img', { src: this.state.snapshot.url })
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                {
                  href: this.state.snapshot.url,
                  target: '_blank'
                },
                'Download'
              )
            )
          )
        ),
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
                { colSpan: 3 },
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
              ),
              _react2.default.createElement(
                'th',
                null,
                'Actions'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.state.files.map(function (file) {
              totalSize = totalSize + file.size;
              return _react2.default.createElement(
                'tr',
                { key: file.spacesName },
                _react2.default.createElement(
                  'td',
                  null,
                  _this4.renderFileName(file)
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  (0, _maskJs.maskCurrency)(file.size / 1024),
                  ' KB'
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        return _this4.removeFile(file);
                      } },
                    'Remove'
                  )
                )
              );
            }),
            this.state.files.length < 1 && _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { colSpan: 3 },
                'No files chosen.'
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                null,
                'Summary:'
              ),
              _react2.default.createElement(
                'td',
                null,
                (0, _maskJs.maskCurrency)(totalSize / 1024),
                ' KB'
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'a',
                  { onClick: function onClick() {
                      return _this4.clearList();
                    } },
                  'Clear'
                )
              )
            )
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.files === prevState.files) return null;
      var files = nextProps.files || [];
      var showUploadButton = files.filter(function (file) {
        return !file.uploaded;
      }).length > 0;
      return {
        files: files,
        showUploadButton: showUploadButton
      };
    }
  }]);

  return FileManager;
}(_react.Component);

FileManager.propTypes = {
  id: _propTypes2.default.string.isRequired,
  onComplete: _propTypes2.default.func
};

exports.default = FileManager;