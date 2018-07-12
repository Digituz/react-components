'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _awsSdk = require('aws-sdk');

var AWS = _interopRequireWildcard(_awsSdk);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _maskJs = require('mask-js');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../');

require('./FileManager.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileManager = function (_Component) {
  (0, _inherits3.default)(FileManager, _Component);

  function FileManager(props) {
    (0, _classCallCheck3.default)(this, FileManager);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FileManager.__proto__ || Object.getPrototypeOf(FileManager)).call(this, props));

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
      endpoint: new AWS.Endpoint(props.endpoint),
      accessKeyId: props.accessKeyId,
      secretAccessKey: props.secretAccessKey
    });
    return _this;
  }

  (0, _createClass3.default)(FileManager, [{
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
      var newFiles = [].concat((0, _toConsumableArray3.default)(this.fileManager.current.files)).map(function (file) {
        var randomDir = new Date().getTime();
        file.spacesName = randomDir + '/' + file.name;
        return file;
      });

      this.props.onComplete([].concat((0, _toConsumableArray3.default)(filesUploaded), (0, _toConsumableArray3.default)(newFiles)));
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
          Bucket: _this2.props.bucketName,
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

          _this2.props.onComplete(files);
        });

        return uploadManager.promise();
      });

      Promise.all(uploadEvents).then(function () {
        if (_this2.unmounted) return;

        var files = _this2.state.files.map(function (file) {
          delete file.progress;
          file.uploaded = true;
          return file;
        });

        _this2.props.onComplete(files);
      });
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
      var _props = this.props,
          bucketName = _props.bucketName,
          endpoint = _props.endpoint;

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
  onComplete: _propTypes2.default.func,
  accessKeyId: _propTypes2.default.string.isRequired,
  bucketName: _propTypes2.default.string.isRequired,
  endpoint: _propTypes2.default.string.isRequired,
  secretAccessKey: _propTypes2.default.string.isRequired
};

exports.default = FileManager;