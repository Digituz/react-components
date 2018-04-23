import React, {Component} from  'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import RestFlexClient from '@digituz/rest-flex-client';
import {Button, Card, Grid, InputLabel, NotificationManager} from '../';

class EntityForm extends Component {
  constructor(props) {
    super(props);

    const entity = {};

    Object.keys(props.model.properties).forEach(property => {
      entity[property] = '';
    });

    this.state = {
      id: null,
      entity,
    };

    this.updateField = this.updateField.bind(this);

    this.client = new RestFlexClient(this.props.model.url);
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

  getFieldFromProperty(propertyKey) {
    const property = this.props.model.properties[propertyKey];
    if (property.type === 'string') {
      return (
        <div className="sm-12" key={propertyKey}>
          <InputLabel
            inputId={propertyKey}
            label={property.label}
            placeholder={property.placeholder}
            value={this.state.entity[propertyKey]}
            onBlur={this.updateField(propertyKey)}
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
  model: PropTypes.shape({
    url: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    plural: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouter(EntityForm);
