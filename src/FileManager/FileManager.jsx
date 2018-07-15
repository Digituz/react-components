import * as AWS from 'aws-sdk';
import React, {Component} from 'react';
import {maskCurrency} from 'mask-js';
import PropTypes from 'prop-types';
import {Button, If, Modal} from '../';
import './FileManager.scss';

class FileManager extends Component {
  constructor(props) {
    super(props);
    this.fileManager = React.createRef();

    this.state = {
      files: [],
      snapshot: {
        visible: false,
        y: 0,
        x: 0,
        url: '',
        mimeType: '',
      },
      showUploadButton: false,
    };

    this.doSpaces = new AWS.S3({
      endpoint: new AWS.Endpoint(props.endpoint),
      accessKeyId: props.accessKeyId,
      secretAccessKey: props.secretAccessKey
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.files === prevState.files) return null;
    const files = nextProps.files || [];
    const showUploadButton = files.filter((file) => (!file.uploaded)).length > 0;
    return {
      files,
      showUploadButton,
    };
  }

  componentDidMount() {
    this.unmounted = false;
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  openFileChooser() {
    // disabled?
    if (this.state.files.length >= 1 && !this.props.multiple) return;
    this.fileManager.current.click();
  }

  fileChosen() {
    const filesUploaded = this.state.files.filter(file => (file.uploaded));
    const newFiles = [...this.fileManager.current.files].map(file => {
      const randomDir = (new Date()).getTime();
      file.spacesName = `${randomDir}/${file.name}`;
      return file;
    });

    this.props.onComplete([...filesUploaded, ...newFiles]);
  }

  uploadFiles() {
    const options = {
      partSize: 10 * 1024 * 1024, // 10 MB
      queueSize: 10
    };

    const uploadEvents = this.state.files.map((file) => {
      if (file.uploaded) return null;

      const params = {
        ACL: 'public-read',
        Bucket: this.props.bucketName,
        Key: file.spacesName,
        Body: file,
      };
      const uploadManager = this.doSpaces.upload(params, options);

      uploadManager.on('httpUploadProgress', (progress) => {
        if (this.unmounted) return;

        const files = this.state.files.map(fileIter => {
          if (
            file.name === fileIter.name &&
            file.size === fileIter.size
          ) {
            return {
              name: file.name,
              spacesName: file.spacesName,
              type: file.type,
              size: file.size,
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
              progress: progress.loaded / progress.total * 100,
            };
          }
          return fileIter;
        });

        this.props.onComplete(files);
      });

      return uploadManager.promise();
    });

    Promise.all(uploadEvents).then(() => {
      if (this.unmounted) return;

      const files = this.state.files.map(file => {
        delete file.progress;
        file.uploaded = true;
        return file;
      });

      this.props.onComplete(files);
    });
  }

  clearList() {
    const files = this.state.files.filter(file => {
      return null;
    });

    this.fileManager.current.value = '';

    this.props.onComplete(files);
  }

  showSnapshot(event, file) {
    const {bucketName, endpoint} = this.props;
    this.setState({
      snapshot: {
        visible: true,
        url: `https://${bucketName}.${endpoint}/${file.spacesName}`,
        mimeType: file.type,
      },
    });
  }

  closeSnapshot() {
    this.setState({
      snapshot: {
        visible: false,
        url: '',
        mimeType: '',
      },
    });
  }

  renderFileName(file) {
    let fileName = file.name;
    if (file.uploaded) {
      fileName = (
        <a
          target="_blank"
          onClick={(event) => this.showSnapshot(event, file)}
        >
          {file.name}
        </a>
      );
    }
    return (
      <React.Fragment>
        {fileName}
        {
          file.progress &&
          <span> ({maskCurrency(file.progress)} %)</span>
        }
      </React.Fragment>
    )
  }

  removeFile(removedFile) {
    const files = this.state.files.filter(file => (file.spacesName !== removedFile.spacesName));
    this.props.onComplete(files);
  }

  render() {
    let totalSize = 0;
    console.log(this.state.files.length >= 1 && !this.props.multiple);
    return (
      <div className="drc-file-upload">
        <h3>{this.props.label}</h3>
        <input
          type="file"
          ref={this.fileManager}
          onChange={() => (this.fileChosen())}
          id={this.props.id}
          multiple={this.props.multiple}
        />
        <Button
          onClick={() => (this.openFileChooser())}
          disabled={this.state.files.length >= 1 && !this.props.multiple}
          text="Choose Files"
        />
        <If condition={this.state.showUploadButton}>
          <Button
            className="upload-button"
            onClick={() => this.uploadFiles()}
            text="Upload Files"
          />
        </If>
        <If condition={this.state.snapshot.visible}>
          <Modal onSuccess={() => (this.closeSnapshot())}>
            <If condition={this.state.snapshot.mimeType.indexOf('image/') === 0}>
              <img src={this.state.snapshot.url} />
            </If>
            <p>
              <a
                href={this.state.snapshot.url}
                target="_blank"
              >
                Download
              </a>
            </p>
          </Modal>
        </If>
        <table>
          <thead>
          <tr>
            <th colSpan={3}>{this.props.label}</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.state.files.map(file => {
            totalSize = totalSize + file.size;
            return (
              <tr key={file.spacesName}>
                <td>
                  { this.renderFileName(file) }
                </td>
                <td>{maskCurrency(file.size / 1024)} KB</td>
                <td>
                  <a onClick={() => this.removeFile(file)}>Remove</a>
                </td>
              </tr>
            )
          })}
          {this.state.files.length < 1 &&
          <tr>
            <td colSpan={3}>No files chosen.</td>
          </tr>
          }
          <tr>
            <td>Summary:</td>
            <td>{maskCurrency(totalSize / 1024)} KB</td>
            <td><a onClick={() => this.clearList()}>Clear</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

FileManager.propTypes = {
  accessKeyId: PropTypes.string.isRequired,
  bucketName: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  onComplete: PropTypes.func,
  secretAccessKey: PropTypes.string.isRequired,
};

export default FileManager;
