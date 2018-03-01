import React from 'react';
import ReactDOM from 'react-dom';
import Header from '@digituz/react-header';

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <Header title="Digituz React Components Showcase" />
        <p>Hello, {this.props.name}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="World!" />,
  document.getElementById('root')
);
