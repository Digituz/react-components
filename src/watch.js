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

    const run = ['monorepo', ['runScript', '-r', 'prepublishOnly']];
    if (pkg !== 'global-style.scss') run[1].push('-p', pkg);

    console.log(`Running prepublishOnly for ${pkg}.`);

    const execution = spawnSync(...run);

    if (execution.stdout) return console.log(execution.stdout.toString());
    if (execution.stderr) return console.log(execution.stderr.toString());
  });
});
