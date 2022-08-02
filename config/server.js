const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const compiler = Webpack(webpackConfig());
const devServerOptions = { ...webpackConfig.devServer, open: true };
const devServer = new WebpackDevServer(devServerOptions, compiler);

devServer.startCallback(() => {
  console.log('Starting server on http://localhost:3000');
});
