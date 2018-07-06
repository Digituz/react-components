import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EntityForm from './EntityForm';
import EntityList from './EntityList';
import Entity from './Entity';

class RestFlexRoute extends Component {
  showList() {
    return (
      <EntityList
        accessToken={this.props.accessToken}
        model={this.props.model}
        navigate={this.props.navigate}
        tableColumns={this.props.tableColumns}
      />
    );
  }

  showForm() {
    return (
      <EntityForm
        accessToken={this.props.accessToken}
        entityId={this.props.entityId}
        goBack={this.props.goBack}
        model={this.props.model}
        navigate={this.props.navigate}
        entity={{}}
      />
    )
  }

  render() {
    if (!this.props.entityId) return this.showList();
    return this.showForm();
  }
}

RestFlexRoute.propTypes = {
  accessToken: PropTypes.string.isRequired,
  entityId: PropTypes.string,
  goBack: PropTypes.func.isRequired,
  model: PropTypes.shape(Entity).isRequired,
  navigate: PropTypes.func.isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RestFlexRoute;
