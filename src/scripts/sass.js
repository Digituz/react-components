const sass = require('node-sass');
const { existsSync, mkdirSync, writeFileSync, readdirSync, lstatSync } = require('fs');

const sourceDir = './';
const destinationDir = '../dist';
const sassFiles = [];

readdirSync(sourceDir).forEach(path => {
  if (lstatSync(`${sourceDir}/${path}`).isDirectory()) {
    if (path === 'node_modules' || path === 'test') return;
    readdirSync(`${sourceDir}/${path}`).forEach(file => {
      if ( ! file.endsWith('.css')) return;
      sassFiles.push({
        path,
        file,
      });
    });
  }
});

if (!existsSync(destinationDir)) mkdirSync(destinationDir);

sassFiles.forEach(sassFile => {
  const { path, file } = sassFile;

  const cssContent = sass.renderSync({
    file: `${sourceDir}/${path}/${file}`,
    outputStyle: 'compressed'
  });

  if (!existsSync(`${destinationDir}/${path}`)) mkdirSync(`${destinationDir}/${path}`);

  writeFileSync(`${destinationDir}/${path}/${file}`, cssContent.css.toString());
});
