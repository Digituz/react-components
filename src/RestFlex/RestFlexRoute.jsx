import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import EntityForm from './EntityForm';
import EntityList from './EntityList';

class RestFlexRoute extends Component {
  render() {
    return (
      <Fragment key={this.props.model.path}>
        <Route exact path={this.props.model.path} render={() => {
          return <EntityList model={this.props.model} columns={this.props.columns}/>
        }}/>
        <Route exact path={`${this.props.model.path}/:id`} render={() => {
          return <EntityForm model={this.props.model} entity={{}}/>
        }}/>
      </Fragment>
    )
  }
}

RestFlexRoute.propTypes = {
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

export default RestFlexRoute;
