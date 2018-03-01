const { spawn } = require('child_process');
const { logData } = require('./util');

// bootstrap an http server
const httpServer = spawn('http-server', ['.'], { pwd: `${__dirname}/../` });
httpServer.stdout.on('data', logData);
httpServer.stderr.on('data', logData);
httpServer.on('close', logData);

// trigger webpack on watch and development mode
const webpack = spawn('webpack', ['--mode', 'development', '--watch', '--progress']);
webpack.stdout.on('data', logData);
webpack.stderr.on('data', logData);
webpack.on('close', logData);
