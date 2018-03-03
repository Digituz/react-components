const watch = require('watch');
const { spawnSync } = require('child_process');

const watchOptions = {
  ignoreDirectoryPattern: /node_modules/,
  interval: 0.5,
};

watch.createMonitor('./', watchOptions, (monitor) => {
  monitor.on("changed", (file) => {
    if (file.indexOf('.test.js') > -1) return;
    if (file.indexOf('/dist/') > -1) return;
    if (file.indexOf('.jsx') < 0 && file.indexOf('.scss') < 0) return;

    const pkg = file.split('/')[0];

    const execution = spawnSync('npm', ['run', 'prepublishOnly'], { cwd: `${__dirname}/${pkg}` });
    console.log(execution.stdout.toString());
    console.log(execution.stderr.toString());
  });
});
