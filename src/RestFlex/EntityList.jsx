import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import RestFlexClient from '@digituz/rest-flex-client';
import {Button, Card, Table} from '../';

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
    return (
      <Card className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2" title={this.props.model.plural}>
        <p>{this.props.model.description}</p>
        <Button onClick={() => { this.newEntity() }} text={`New ${this.props.model.title}`} />
        <Table data={this.state.data} columns={this.props.columns} />
      </Card>
    );
  }
}

EntityList.propTypes = {
  model: PropTypes.shape({
    url: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    plural: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
  }).isRequired,
  columns: PropTypes.array.isRequired,
};

export default withRouter(EntityList);
