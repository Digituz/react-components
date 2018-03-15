const watch = require('watch');
const { spawnSync } = require('child_process');

const watchOptions = {
  ignoreDirectoryPattern: /node_modules/,
  interval: 0.5,
};

let lastPrepublishTriggered = (new Date()).getTime();

watch.createMonitor(`${__dirname}/../src/`, watchOptions, (monitor) => {
  monitor.on('changed', (file) => {
    if (file.indexOf('.test.js') > -1) return;
    if (file.indexOf('.jsx') < 0 && file.indexOf('.scss') < 0) return;

    const now = (new Date()).getTime();

    // just debouncing to avoid multiple, useless runs of  prepublishOnly
    if (now - lastPrepublishTriggered < 2000) return;

    lastPrepublishTriggered = now;
    console.log(file);

    const execution = spawnSync('npm', ['run', 'prepublishOnly']);

    if (execution.stdout) return console.log(execution.stdout.toString());
    if (execution.stderr) return console.log(execution.stderr.toString());
  });
});
