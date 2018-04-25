import * as AWS from 'aws-sdk';
import React, {Component} from 'react';
import {maskCurrency} from 'mask-js';
import PropType from 'prop-types';
import {Button} from '../';
import './FileUpload.scss';

const accessKeyId = 'TKPLAKLR23UMLNYEVV24';
const secretAccessKey = 'Wbt7tJSEPwytAHZ2dnS4YbSPS1TbDBGBNQ78xlFKtWo';
const endpoint = 'nyc3.digitaloceanspaces.com';
const bucketName = 'brand-house';

class FileUpload extends Component {
  constructor() {
    super();
    this.fileUpload = React.createRef();

    this.state = {
      files: [],
    };

    this.doSpaces = new AWS.S3({
      endpoint: new AWS.Endpoint(endpoint),
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    });
  }

  openFileChooser() {
    this.fileUpload.current.click();
  }

  fileChosen() {
    const files = [...this.fileUpload.current.files];
    this.setState({
      files,
    });
  }

  uploadFiles() {
    const options = {
      partSize: 10 * 1024 * 1024, // 10 MB
      queueSize: 10
    };

    const uploadEvents = this.state.files.map((file) => {
      const randomDir = (new Date()).getTime();
      const params = {
        ACL: 'public-read',
        Bucket: bucketName,
        Key: `${randomDir}/${file.name}`,
        Body: file,
      };
      const uploadManager = this.doSpaces.upload(params, options);

      file.spacesName = params.Key;

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
          return file;
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
        return file;
      });

      this.setState({
        files,
      });

      this.props.onComplete(files);
    });
  }

  clearList() {
    const files = this.state.files.filter(file => {
      return null;
    });

    this.fileUpload.current.value = '';

    this.setState({
      files,
    });
  }

  renderFileName(file) {
    let fileName = file.name;
    if (file.spacesName) {
      fileName = (
        <a target="_blank" href={`https://${bucketName}.${endpoint}/${file.spacesName}`}>
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

  render() {
    return (
      <div className="drc-file-upload">
        <input
          type="file"
          ref={this.fileUpload}
          onChange={() => (this.fileChosen())}
          id={this.props.id}
          multiple={true}
        />
        <Button
          onClick={() => (this.openFileChooser())}
          text="Choose Files"
        />
        <table>
          <thead>
          <tr>
            <th colSpan={2}>Files Chosen</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Size</th>
          </tr>
          </thead>
          <tbody>
          {this.state.files.map(file => (
            <tr key={file.name}>
              <td>
                { this.renderFileName(file) }
              </td>
              <td>{maskCurrency(file.size / 1024)} KB</td>
            </tr>
          ))}
          {this.state.files.length < 1 &&
          <tr>
            <td colSpan={2}>No files chosen.</td>
          </tr>
          }
          <tr>
            <td><a onClick={() => this.uploadFiles()}>Upload</a></td>
            <td><a onClick={() => this.clearList()}>Clear</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

FileUpload.propTypes = {
  id: PropType.string.isRequired,
  onComplete: PropType.func,
};

export default FileUpload;
