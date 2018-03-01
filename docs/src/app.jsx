import React from 'react';
import ReactDOM from 'react-dom';
import Header from '@digituz/react-header';
import './app.css';

class HelloMessage extends React.Component {
  render() {
    return (
      <div className="showcase-root">
        <Header title="Digituz React Components Showcase">
          I might add something here.
        </Header>
        <p>Hello, {this.props.name}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="World!" />,
  document.getElementById('root')
);
