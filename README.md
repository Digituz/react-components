## React Components Powered by Digituz

This a monorepo, managed by custom scripts and Travis, with React components that try to have as few dependencies as possible. For the moment, this monorepo contains only two components:

- [`Button`](./src/Button)
- [`Input`](./src/Input)

### Releasing New Versions

The [`.travis.yml`](./.travis.yml) file contains a `$NPM_TOKEN` environment variable encrypt in the `env.global.secure` property. This token must be valid, so Travis can properly publish to NPM. To have a valid token, you **must** have NPM logged in on an environment. If you issue `npm logout`, NPM removes the token from your account and, as such, this becomes an invalid token.

So, if this happens, you need to `npm login` again in some environment (like you development machine) and look in your `~/.npmrc` file. You will see an entry that looks something like this:

```bash
//registry.mycompany.com/:_authToken=[my-secret-token]
```

Then, copy whatever is in the place of `[my-secret-token]`, and use it with the following command:

```bash
travis encrypt NPM_TOKEN=[my-secret-token] --add env.global
```

This will create a new `env.global.secure`. Not that it is better to remove the previous `env.global.secure` property, as it is not valid anymore and that it needs to be replaced by the new one.
