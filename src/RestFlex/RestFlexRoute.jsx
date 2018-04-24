import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import EntityForm from './EntityForm';
import EntityList from './EntityList';
import Entity from './Entity';

class RestFlexRoute extends Component {
  render() {
    return (
      <Fragment key={this.props.model.path}>
        <Route exact path={this.props.model.path} render={() => {
          return (
            <EntityList
              auth0Config={this.props.auth0Config}
              model={this.props.model}
              tableColumns={this.props.tableColumns}
            />
          );
        }}/>
        <Route exact path={`${this.props.model.path}/:id`} render={() => {
          return (
            <EntityForm
              auth0Config={this.props.auth0Config}
              model={this.props.model}
              entity={{}}
            />
          )
        }}/>
      </Fragment>
    )
  }
}

RestFlexRoute.propTypes = {
  auth0Config: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    clientID: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired
  }).isRequired,
  model: PropTypes.shape(Entity).isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RestFlexRoute;
