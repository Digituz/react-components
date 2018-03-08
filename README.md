# React Components Powered by Digituz

This repository houses React Components provided by Digituz. All components are self-contained as distinct NPM packages and the orchestration of these packages is handled by [`@digituz/monorepo`](https://github.com/Digituz/monorepo).

One of the main goals of this project is to provide React components with as few dependencies as possible.

For the moment, this monorepo contains the following components:

- [`Button`](./src/Button)
- [`Header`](./src/Header)
- [`Input`](./src/Input)
- [`InputLabel`](./src/InputLabel)
- [`Panel`](./src/Panel)

## Creating New Components

There is a script on `./src/create-component.js` file that takes as an argument the name of the component and create boilerplate code and files to it. To use it, go to `./src` and issue this:

```bash
node create-component MyComponentName
```

## Releasing New Versions

This section is divided into two parts. First, there will be a subsection that explains how to use `@digituz/monorepo` to release new versions. After that, there will be a subsection about Travis CI.

### Digituz Monorepo

As this project uses `@digituz/monorepo` to orchestrate multiple NPM packages, this subsection shows how to use some `monorepo` commands.

```bash
# monorepo is available at the src directory
cd src

# test all packages
monorepo test

# test a single package
monorepo test -p Button

# run a script on a single package
monorepo runScript -r processCss -p Input

# bump minor version
monorepo bump -b minor
```

The only command necessary to release new versions is the last one, `monorepo bump -b minor`. After executing it, you will see that there is a new Git tag available. Then, you will have to push it to Travis so this tool knows that it must publish new versions.

The command to update the Git repository and, consequently, to make Travis trigger a release is:

```bash
git push origin master --tags
```

### Travis CI

The [`.travis.yml`](./.travis.yml) file contains an encrypted `$NPM_TOKEN` environment variable in the `env.global.secure` property. To publish to NPM, Travis must have a valid token. That is, you **must** have NPM logged in on an environment. If you issue `npm logout`, NPM removes the token from your account and, as such, this becomes an invalid token.

So, if this happens, you need to `npm login` again in some environment (like you development machine). Then, looking in your `~/.npmrc` file, you will see an entry that looks something like this:

```bash
//registry.mycompany.com/:_authToken=[my-secret-token]
```

Copy whatever you find in the place of `[my-secret-token]`, and use it with the following command:

```bash
travis encrypt NPM_TOKEN=[my-secret-token] --add env.global
```

This will create a new `env.global.secure`. Note that it is better to remove the previous `env.global.secure` property, as it is not valid anymore and that it needs to be replaced by the new one.
