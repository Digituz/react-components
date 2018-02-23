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
  } else {
    installInternalPackage(pkg, destinationPkg);
  }
});

function mapLocalPackages() {
  return new Promise((resolve) => {
    let pointers = fs.readdirSync(__dirname);

    pointers = pointers.filter((pointer) => {
      const stat = fs.lstatSync(`${__dirname}/${pointer}`);
      if (stat.isDirectory() && pointer !== 'node_modules') {
        return pointer;
      }
      return null;
    });

    resolve(pointers);
  });
}

function installInternalPackage(pkg, destinationPkg) {
  const link = spawn('npm', ['link'], { cwd: `${__dirname}/${pkg}`});

  link.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  link.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  link.on('close', (code) => {
    if (code === 0) {
      console.log('Internal packaged linked successfully.');
      const pkgDescription = require(`${__dirname}/${pkg}/package.json`);

      const link2 = spawn('npm', ['link', pkgDescription.name], { cwd: `${__dirname}/${destinationPkg}`});

      link2.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      link2.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      link2.on('close', (code) => {
        console.log('Link process finished successfully.');
      });
    }
  });
}

function installExternalPackage(pkg, destinationPkg) {
  const install = spawn('npm', ['install', pkg], { cwd: `${__dirname}/${destinationPkg}`});

  install.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  install.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('External package properly installed.');
    }
  });
}
