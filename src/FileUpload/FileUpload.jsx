import * as AWS from 'aws-sdk';
import React, {Component} from 'react';
import {maskCurrency} from 'mask-js';
import PropType from 'prop-types';
import {Button} from '../';
import './FileUpload.scss';

class FileUpload extends Component {
  constructor() {
    super();
    this.fileUpload = React.createRef();

    this.state = {
      files: [],
    }
  }

  openFileChooser() {
    console.log(this.fileUpload);
    this.fileUpload.current.click();
  }

  fileChosen() {
    const files = [...this.fileUpload.current.files];
    this.setState({
      files,
    });
  }

  uploadFiles() {
    const accessKeyId = 'TKPLAKLR23UMLNYEVV24';
    const secretAccessKey = 'Wbt7tJSEPwytAHZ2dnS4YbSPS1TbDBGBNQ78xlFKtWo';
    const region = 'nyc3';  // New York region by default

    const spacesEndpoint = new AWS.Endpoint(region + '.digitaloceanspaces.com');
    const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    });

    const options = {
      partSize: 10 * 1024 * 1024, // 10 MB
      queueSize: 10
    };

    const uploadEvents = this.state.files.map((file) => {
      const params = {
        ACL: 'public-read',
        Bucket: 'brand-house',
        Key: file.name,
        Body: file,
      };
      return s3.upload(params, options).promise();
    });

    console.log(uploadEvents);

    Promise.all(uploadEvents).then(values => {
      console.log('good to go');
    });
  }

  clearList() {
    const files = this.state.files.filter(file => {
      return null;
    });

    this.fileUpload.current.value = '';

    this.setState({
      files,
    })
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
              <td>{file.name}</td>
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
  onStart: PropType.func,
  onComplete: PropType.func,
  onError: PropType.func,
};

export default FileUpload;
