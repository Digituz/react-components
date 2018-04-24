import React, {Component} from  'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import RestFlexClient from '@digituz/rest-flex-client';
import {Button, Card, Grid, InputLabel, NotificationManager} from '../';
import Entity from './Entity';

class EntityForm extends Component {
  constructor(props) {
    super(props);

    const entity = {};

    Object.keys(props.model.properties).forEach(propertyKey => {
      const property = this.props.model.properties[propertyKey];
      if (property.format === 'date') {
        return entity[propertyKey] = new Date();
      }
      entity[propertyKey] = '';
    });

    this.state = {
      id: null,
      entity,
    };

    this.updateField = this.updateField.bind(this);

    const {url, audience, domain} = this.props.model;
    this.client = new RestFlexClient(url, audience, domain, props.auth0Config);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
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
    return null;
  }

  save() {
    if (this.state.id) {
      this.client.update(this.state.id, this.state.entity)
        .then(() => {
          this.props.history.push(this.props.model.path);
          NotificationManager.success(`${this.props.model.plural} updated successfully.`);
        })
        .catch((err) => {
          if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
          NotificationManager.danger('Something went wrong.');
        });
      return;
    }
    this.client.insert(this.state.entity)
      .then(() => {
        this.props.history.push(this.props.model.path);
        NotificationManager.success(`${this.props.model.plural} inserted successfully.`);
      })
      .catch((err) => {
        if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
        NotificationManager.danger('Something went wrong.');
      });
  }

  goBack() {
    this.props.history.goBack();
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
            <Button className="default" onClick={() => { this.goBack() }} text="Return" />
          </div>
        </Grid>
      </Card>
    );
  }
}

EntityForm.propTypes = {
  auth0Config: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    clientID: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired
  }).isRequired,
  model: PropTypes.shape(Entity).isRequired,
};

export default withRouter(EntityForm);
