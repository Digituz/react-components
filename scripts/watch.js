const watch = require('scripts/watch');
const { spawnSync } = require('child_process');

const watchOptions = {
  ignoreDirectoryPattern: /node_modules/,
  interval: 0.5,
};

watch.createMonitor('./', watchOptions, (monitor) => {
  monitor.on("changed", (file) => {
    if (file.indexOf('.test.js') > -1) return;
    if (file.indexOf('.jsx') < 0 && file.indexOf('.css') < 0) return;

    const execution = spawnSync('npm', ['run', 'prepublishOnly']);

    if (execution.stdout) return console.log(execution.stdout.toString());
    if (execution.stderr) return console.log(execution.stderr.toString());
  });
});
