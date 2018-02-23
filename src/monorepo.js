const fs = require('fs');
const { spawn } = require('child_process');

const command = process.argv[2];
const pkg = process.argv[3];
const destinationPkg = process.argv[4];

if (!command || command !== 'install' ||
    !pkg || !destinationPkg) {
  console.error('To use this script, type: node src/monorepo install some-pkg destination-pkg');
  process.exit(1);
}

mapLocalPackages().then(localPackages => {
  const destinationPackageExists = localPackages.includes(destinationPkg);
  if (!destinationPackageExists) {
    console.error('To use this script, type: node src/monorepo install some-pkg destination-pkg');
    process.exit(1);
  }

  const installingLocalPackage = localPackages.includes(pkg);
  if (!installingLocalPackage) {
    installExternalPackage(pkg, destinationPkg);
  }
});

function mapLocalPackages() {
  return new Promise((resolve) => {
    let pointers = fs.readdirSync(__dirname);

    pointers = pointers.filter((pointer) => {
      const stat = fs.lstatSync(__dirname + '/' + pointer);
      if (stat.isDirectory() && pointer !== 'node_modules') {
        return pointer;
      }
      return null;
    });

    resolve(pointers);
  });
}

function installExternalPackage(pkg, destinationPkg) {
  const install = spawn('npm', ['install', pkg], { cwd: __dirname + '/' + destinationPkg });

  install.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  install.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('External package properly installed.');
    }
  });
}
