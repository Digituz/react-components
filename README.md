## React Components Powered by Digituz

This a monorepo, managed by custom scripts and Travis, with React components that try to have as few dependencies as possible. For the moment, this monorepo contains the following components:

- [`Button`](./src/Button)
- [`Header`](./src/Header)
- [`Input`](./src/Input)
- [`InputLabel`](./src/InputLabel)

### Releasing New Versions

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
