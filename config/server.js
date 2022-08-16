process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.APP_ENV = 'development';
process.env.MOCK = true;

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
