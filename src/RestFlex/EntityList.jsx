import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import RestFlexClient from '@digituz/rest-flex-client';
import {Button, Card, Table} from '../';
import Entity from './Entity';

class EntityList extends Component {
  constructor(props) {
    super(props);

    this.client = new RestFlexClient(this.props.model.url);

    this.state = {
      data: [],
    };
  }

  newEntity() {
    this.props.history.push(`${this.props.model.path}/new`);
  }

  componentDidMount() {
    this.client.get().then((data) => {
      this.setState({
        data,
      });
    });
  }

  render() {
    const columns = this.props.tableColumns.map(col => {
      const property = this.props.model.properties[col];
      return {
        ...property,
        columnClass: property.format === 'date'? 'date' : '',
        property: col,
      }
    });

    return (
      <Card className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2" title={this.props.model.plural}>
        <p>{this.props.model.description}</p>
        <Button onClick={() => { this.newEntity() }} text={`New ${this.props.model.title}`} />
        <Table data={this.state.data} columns={columns} />
      </Card>
    );
  }
}

EntityList.propTypes = {
  model: PropTypes.shape(Entity).isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withRouter(EntityList);
