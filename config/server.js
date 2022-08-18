const args = process.argv.slice(2);

process.env.BABEL_ENV = args[0];
process.env.NODE_ENV = args[0];
process.env.APP_ENV = args[0];
process.env.MOCK = !!args[1];

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const compiler = Webpack(webpackConfig());
const devServerOptions = { ...webpackConfig().devServer, open: true };
const devServer = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  await devServer.start();
};

runServer();
