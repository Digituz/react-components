const { spawn } = require('child_process');
const { logData } = require('./util');

// link @digituz/react-components
const linkButton = spawn('npm', ['link'], { pwd: `${__dirname}/../../src/Button/` });
linkButton.stdout.on('data', logData);
linkButton.stderr.on('data', logData);

const linkButtonHere = spawn('npm', ['link', '@digituz/react-button'], { pwd: `${__dirname}/../` });
linkButtonHere.stdout.on('data', logData);
linkButtonHere.stderr.on('data', logData);

const linkHeader = spawn('npm', ['link'], { pwd: `${__dirname}/../../src/Header/` });
linkHeader.stdout.on('data', logData);
linkHeader.stderr.on('data', logData);

const linkHeaderHere = spawn('npm', ['link', '@digituz/react-header'], { pwd: `${__dirname}/../` });
linkHeaderHere.stdout.on('data', logData);
linkHeaderHere.stderr.on('data', logData);

const linkInput = spawn('npm', ['link'], { pwd: `${__dirname}/../../src/Input/` });
linkInput.stdout.on('data', logData);
linkInput.stderr.on('data', logData);

const linkInputHere = spawn('npm', ['link', '@digituz/react-input'], { pwd: `${__dirname}/../` });
linkInputHere.stdout.on('data', logData);
linkInputHere.stderr.on('data', logData);

const linkInputLabel = spawn('npm', ['link'], { pwd: `${__dirname}/../../src/InputLabel/` });
linkInputLabel.stdout.on('data', logData);
linkInputLabel.stderr.on('data', logData);

const linkInputLabelHere = spawn('npm', ['link', '@digituz/react-input-label'], { pwd: `${__dirname}/../` });
linkInputLabelHere.stdout.on('data', logData);
linkInputLabelHere.stderr.on('data', logData);
