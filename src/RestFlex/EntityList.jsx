import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RestFlexClient from '@digituz/rest-flex-client';
import {Button, Card, DropDown, NotificationManager, Table} from '../';
import Entity from './Entity';

class EntityList extends Component {
  constructor(props) {
    super(props);

    const {url} = this.props.model;
    this.client = new RestFlexClient(url, this.props.accessToken);

    this.state = {
      data: null,
    };
  }

  newEntity() {
    this.props.navigate(this.props.model.path, 'new');
  }

  editEntity(entity) {
    this.props.navigate(this.props.model.path, entity._id);
  }

  deleteEntity(entity) {
    this.client.remove(entity._id)
      .then((res) => {
        if (res.status === 401) {
          return NotificationManager.danger('You are not authorized to remove this entity.');
        }
        if (res.status > 400) {
          console.log(res);
          return NotificationManager.danger('Something went wrong.');
        }
        NotificationManager.success(`${this.props.model.title} removed successfully.`);
        this.loadEntities();
      })
      .catch((err) => {
        if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
        NotificationManager.danger('Something went wrong.');
      });
  }

  async loadEntities() {
    const data = await this.client.get();
    this.setState({
      data,
    });
  }

  componentDidMount() {
    this.loadEntities();
  }

  render() {
    const columns = this.props.tableColumns.map(col => {
      const property = this.props.model.properties[col];
      return {
        ...property,
        columnClass: property.format || '',
        property: col,
      }
    });

    columns.push({
      label: 'Actions',
      columnClass: 'actions',
      renderer: (entity) => {
        const dropDownOptions = [
          { label: 'Edit', default: true, onClick: () => { this.editEntity(entity) }},
          { label: 'Delete', onClick: () => { this.deleteEntity(entity) }},
        ];
        return (
          <DropDown options={dropDownOptions} />
        );
      },
    });

    return (
      <Card className="sm-12 lg-10 lg-pad-1" title={this.props.model.plural}>
        <p>{this.props.model.description}</p>
        <Button onClick={() => { this.newEntity() }} text={`New ${this.props.model.title}`} />
        <Table data={this.state.data} columns={columns} />
      </Card>
    );
  }
}

EntityList.propTypes = {
  accessToken: PropTypes.string.isRequired,
  model: PropTypes.shape(Entity).isRequired,
  navigate: PropTypes.func.isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EntityList;
