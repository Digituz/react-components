const { existsSync, mkdirSync, writeFileSync } = require('fs');

// 0 and 2 refer to:
// [0]: node path
// [1]: script path
const componentName = process.argv[2];

const componentPath = `${__dirname}/${componentName}`;
const sourcePath = `${componentPath}/src`;
const testPath = `${componentPath}/test`;

createIfNeeded(componentPath);
createIfNeeded(sourcePath);
createIfNeeded(testPath);

//
// writing the JSX file
//
writeIfEmpty(`${sourcePath}/${componentName}.jsx`,
`import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '.${componentName}.css';

class ${componentName} extends Component {
  render() {
    const classes = \`digituz-react-${camelToKebab(componentName)} $\{this.props.className}\`;
    return (
      <div className={classes}></div>
    );
  }
}

${componentName}.propTypes = {
  className: PropTypes.string,
};

${componentName}.defaultProps = {
  className: '',
};

export default ${componentName};
`);

//
// writing the SCSS file
//
writeIfEmpty(`${sourcePath}/${componentName}.scss`,
`div.digituz-react-${camelToKebab(componentName)} {
}
`);

//
// writing the jest-config.js file
//
writeIfEmpty(`${componentPath}/jest-config.js`,
`import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
`);

//
// writing the package.ext.json file
//
writeIfEmpty(`${componentPath}/package.ext.json`,
`{
  "name": "@digituz/react-${camelToKebab(componentName)}",
  "version": "${getCurrentVersion()}",
  "description": "React ${componentName}",
  "main": "./dist/${componentName}.js"
}
`);

//
// writing the package-lock.json file
//
writeIfEmpty(`${componentPath}/package-lock.json`,
`{
  "name": "@digituz/react-${camelToKebab(componentName)}",
  "version": "${getCurrentVersion()}",
  "lockfileVersion": 1
}
`);

//
// writing the .test.js file
//
writeIfEmpty(`${testPath}/${componentName}.test.js`,
`import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import ${componentName} from '../src/${componentName}';

describe('${componentName} test suite', function() {
  it('should render without throwing an error', function() {
    const defaultClass = 'digituz-react-${camelToKebab(componentName)}';
    const customClass = 'some-custom-class-for-${camelToKebab(componentName)}';

    const wrapper = mount(<${componentName} className={customClass}/>);
    expect(wrapper.find(\`.$\{defaultClass}\`)).toBeDefined();
    expect(wrapper.find(\`.$\{customClass}\`)).toBeDefined();
  });
});
`);

function createIfNeeded(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}

function writeIfEmpty(file, content) {
  if (!existsSync(file)) {
    writeFileSync(file, content);
  }
}

function camelToKebab(camelCaseValue) {
  return camelCaseValue.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getCurrentVersion() {
  return require(`${__dirname}/Button/package.ext.json`).version;
}
