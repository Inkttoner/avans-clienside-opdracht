const { composePlugins, withNx } = require('@nx/webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = composePlugins(withNx(), (config, context) => {
  // This ensures node modules like @nestjs/core are not bundled,
  // and are instead listed as deps in the generated package.json.
  config.target = 'node';
  config.externals = [nodeExternals()];

  // Optional: Improve debugging in dev
  if (context.configuration === 'development') {
    config.devtool = 'source-map';
  }

  return config;
});
