import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VerticalMenu.css';

class VerticalMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  closeMenu() {
    this.setState({
      visible: false,
    });
  }

  openMenu() {
    this.setState({
      visible: true,
    });
  }

  render() {
    let classes = `digituz-react-vertical-menu ${this.props.className}`;
    if (this.state.visible) classes += ' state-visible';

    return (
      <div onClick={() => { this.closeMenu() }} className="digituz-react-vertical-menu-overlay">
        <div className={classes}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

VerticalMenu.propTypes = {
  className: PropTypes.string,
};

VerticalMenu.defaultProps = {
  className: '',
};

export default VerticalMenu;
