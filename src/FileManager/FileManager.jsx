import * as AWS from 'aws-sdk';
import React, {Component} from 'react';
import {maskCurrency} from 'mask-js';
import PropType from 'prop-types';
import {Button, Modal} from '../';
import './FileManager.scss';

const accessKeyId = 'TKPLAKLR23UMLNYEVV24';
const secretAccessKey = 'Wbt7tJSEPwytAHZ2dnS4YbSPS1TbDBGBNQ78xlFKtWo';
const endpoint = 'nyc3.digitaloceanspaces.com';
const bucketName = 'brand-house';

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
      },
    };

    this.doSpaces = new AWS.S3({
      endpoint: new AWS.Endpoint(endpoint),
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.files === prevState.files) return null;
    return {
      files: nextProps.files || []
    };
  }

  openFileChooser() {
    this.fileManager.current.click();
  }

  fileChosen() {
    const filesUploaded = this.state.files.filter(file => (file.uploaded));
    const newFiles = [...this.fileManager.current.files].map(file => {
      const randomDir = (new Date()).getTime();
      file.spacesName = `${randomDir}/${file.name}`;
      return file;
    });

    this.setState({
      files: [...filesUploaded, ...newFiles],
    });
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
        Bucket: bucketName,
        Key: file.spacesName,
        Body: file,
      };
      const uploadManager = this.doSpaces.upload(params, options);

      uploadManager.on('httpUploadProgress', (progress) => {
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

        this.setState({
          files: [...files],
        });
      });

      return uploadManager.promise();
    });

    Promise.all(uploadEvents).then(() => {
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
    this.setState({
      snapshot: {
        visible: true,
        url: `https://${bucketName}.${endpoint}/${file.spacesName}`
      },
    });
  }

  closeSnapshot() {
    this.setState({
      snapshot: {
        visible: false,
        url: '',
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
    return (
      <div className="drc-file-upload">
        <input
          type="file"
          ref={this.fileManager}
          onChange={() => (this.fileChosen())}
          id={this.props.id}
          multiple={true}
        />
        <Button
          onClick={() => (this.openFileChooser())}
          text="Choose Files"
        />
        {
          this.state.snapshot.visible && (
            <Modal onSuccess={() => (this.closeSnapshot())}>
              <img src={this.state.snapshot.url} />
              <p>
                <a
                  href={this.state.snapshot.url}
                  target="_blank"
                >
                  Download
                </a>
              </p>
            </Modal>
          )
        }
        <table>
          <thead>
          <tr>
            <th colSpan={3}>Files Chosen</th>
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
            <td><a onClick={() => this.uploadFiles()}>Upload</a></td>
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
  id: PropType.string.isRequired,
  onComplete: PropType.func,
};

export default FileManager;
