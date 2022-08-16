process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.APP_ENV = 'development';
process.env.MOCK = true;

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const { resolveAPP, ipv } = require('./webpack.utils');
const webpackConfig = require('./webpack.config');
const compiler = Webpack(webpackConfig());

const serverConfig = {
  // 开发环境本地启动的服务配置
  static: {
    directory: resolveAPP('../dist'),
  },
  port: 3000,
  compress: true,
  // 自动打开浏览器
  // open: true,
  // 服务器代理 --> 解决开发环境跨域问题
  // proxy: devProxy,
  historyApiFallback: true, // 当找不到路径时，默认加载index.html
  client: {
    // 不显示[webpack-dev-server]的log
    logging: 'none',
    progress: false,
    reconnect: true,
  },
};

const devServer = new WebpackDevServer(serverConfig, compiler);

devServer.startCallback(() => {
  console.log(
    `\nStarting server on ${chalk.greenBright.bold('http://localhost:' + serverConfig.port)}`,
  );
  console.log(
    `On Your Network: ${chalk.greenBright.bold('http://' + ipv() + serverConfig.port)}\n`,
  );
});
