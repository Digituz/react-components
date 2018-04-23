import React, {Component} from  'react';
import PropTypes from 'prop-types';

class EntityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entity: props.entity,
    }
  }

  render() {
    console.log(this.state.entity);
    return (
      <p>good to go</p>
    );
  }
}

EntityForm.propTypes = {
  entity: PropTypes.instanceOf(Object),
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

export default EntityForm;
