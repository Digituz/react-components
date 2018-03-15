const babel = require('babel-core');
const { existsSync, mkdirSync, writeFileSync, readdirSync, lstatSync } = require('fs');

const sourceDir = './';
const destinationDir = '../dist';
const jsxFiles = [];

readdirSync(sourceDir).forEach(path => {
  if (lstatSync(`${sourceDir}/${path}`).isDirectory()) {
    if (path === 'node_modules' || path === 'test') return;
    readdirSync(`${sourceDir}/${path}`).forEach(file => {
      if ( ! file.endsWith('.jsx')) return;
      jsxFiles.push({
        path,
        file,
      });
    });
  }
});

jsxFiles.push({
  path: '',
  file: 'index.jsx',
});

if (!existsSync(destinationDir)) mkdirSync(destinationDir);

jsxFiles.forEach(jsxFile => {
  const { path, file } = jsxFile;

  const jsContent = babel.transformFileSync(`${sourceDir}/${path}/${file}`);

  if (!existsSync(`${destinationDir}/${path}`)) mkdirSync(`${destinationDir}/${path}`);

  writeFileSync(`${destinationDir}/${path}/${file}`, jsContent.code.replace('.scss', '.css').toString());
});
