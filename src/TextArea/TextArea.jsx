import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TextArea.scss';

class TextArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  updateValue(event) {
    const {value} = event.target;
    this.setState({
      value,
    });
  }

  onBlur(event) {
    this.props.onBlur(event.target.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }

  render() {
    return (
      <textarea
        className="drc-textarea"
        placeholder={this.props.placeholder}
        onChange={(e) => (this.updateValue(e))}
        onBlur={(e) => (this.onBlur(e))}
        rows="5"
        value={this.state.value}
      />
    );
  }
}

TextArea.propTypes = {
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default TextArea;
