import React, {Component} from  'react';
import PropTypes from 'prop-types';
import RestFlexClient from '@digituz/rest-flex-client';
import {Button, Card, Grid, InputLabel, NotificationManager} from '../';
import Entity from './Entity';
import FileManager from '../FileManager/FileManager';

class EntityForm extends Component {
  constructor(props) {
    super(props);

    const entity = {};

    Object.keys(props.model.properties).forEach(propertyKey => {
      const property = this.props.model.properties[propertyKey];
      if (property.format === 'date') {
        return entity[propertyKey] = new Date();
      }
      if (property.type === 'file') {
        return entity[propertyKey] = [];
      }
      entity[propertyKey] = '';
    });

    this.state = {
      id: null,
      entity,
    };

    this.updateField = this.updateField.bind(this);

    const {url} = this.props.model;

    this.client = new RestFlexClient(url, this.props.accessToken);
  }

  componentDidMount() {
    const id = this.props.entityId;
    if (id.trim() === 'new') return;
    this.client.get(id).then((entity) => {
      this.setState({
        id,
        entity,
      });
    });
  }

  updateField(property) {
    return (value) => {
      this.setState({
        entity: {
          ...this.state.entity,
          [property]: value,
        },
      });
    };
  }

  getValue(propertyKey, format) {
    if (format === 'number') return this.state.entity[propertyKey] || 0;
    return this.state.entity[propertyKey] || '';
  }

  getFieldFromProperty(propertyKey) {
    const property = this.props.model.properties[propertyKey];
    if (property.type === 'string' || property.type === 'number') {
      return (
        <div className="sm-12" key={propertyKey}>
          <InputLabel
            inputId={propertyKey}
            label={property.label}
            placeholder={property.placeholder}
            value={this.getValue(propertyKey, property.format)}
            onBlur={this.updateField(propertyKey)}
            type={property.format || 'text'}
            inputType={property.inputType}
          />
        </div>
      )
    }
    if (property.type === 'file') {
      return (
        <div className="sm-12" key={propertyKey}>
          <FileManager
            accessKeyId={this.props.fileManagerConfig.accessKeyId}
            bucketName={this.props.fileManagerConfig.bucketName}
            endpoint={this.props.fileManagerConfig.endpoint}
            files={this.getValue(propertyKey)}
            id={propertyKey}
            label={property.label}
            multiple={property.multiple || false}
            onComplete={this.updateField(propertyKey)}
            secretAccessKey={this.props.fileManagerConfig.secretAccessKey}
          />
        </div>
      );
    }
    return null;
  }

  save() {
    // removing files that were not uploaded
    const propertyKeys = Object.keys(this.props.model.properties);
    propertyKeys.forEach((propertyKey) => {
      const property = this.props.model.properties[propertyKey];
      if (property.type === 'file') {
        const files = this.state.entity[propertyKey];
        if (!files) return delete this.state.entity[propertyKey];
        this.state.entity[propertyKey] = files.filter(file => (file.uploaded));
      }
    });

    if (this.state.id) {
      this.client.update(this.state.id, this.state.entity)
        .then((res) => {
          if (res.status === 401) {
            return NotificationManager.danger('You are not authorized to update this entity.');
          }
          if (res.status > 400) {
            console.log(res);
            return NotificationManager.danger('Something went wrong.');
          }
          this.props.navigate(this.props.model.path);
          NotificationManager.success(`${this.props.model.plural} updated successfully.`);
        })
        .catch((err) => {
          if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
          NotificationManager.danger('Something went wrong.');
        });
      return;
    }
    this.client.insert(this.state.entity)
      .then((res) => {
        if (res.status === 401) {
          return NotificationManager.danger('You are not authorized to insert a new entity.');
        }
        if (res.status > 400) {
          console.log(res);
          return NotificationManager.danger('Something went wrong.');
        }
        this.props.navigate(this.props.model.path);
        NotificationManager.success(`${this.props.model.plural} inserted successfully.`);
      })
      .catch((err) => {
        if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
        NotificationManager.danger('Something went wrong.');
      });
  }

  render() {
    const properties = Object.keys(this.props.model.properties);
    const fields = properties.map(property => (this.getFieldFromProperty(property)));

    return (
      <Card
        className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2"
        title={this.props.model.title}>
        <Grid>
          {fields.map(field => (field))}
          <div className="sm-12">
            <Button className="margin-right" onClick={() => { this.save() }} text="Save" />
            <Button className="default" onClick={this.props.goBack} text="Return" />
          </div>
        </Grid>
      </Card>
    );
  }
}

EntityForm.propTypes = {
  accessToken: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  model: PropTypes.shape(Entity).isRequired,
  navigate: PropTypes.func.isRequired,
  fileManagerConfig: PropTypes.shape({
    accessKeyId: PropTypes.string.isRequired,
    bucketName: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    secretAccessKey: PropTypes.string.isRequired,
  }),
};

export default EntityForm;
