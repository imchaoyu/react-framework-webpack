process.env.APP_ENV = 'development';
process.env.MOCK = true;

// 未捕获
process.on('unhandledRejection', (err) => {
  throw err;
});
const isInteractive = process.stdout.isTTY;

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');

const configFactory = require('../config/webpack.config');
const formatWebpackMessages = require('../config/formatWebpackMessages');
const { ipv } = require('../config/webpack.utils');
const { clearConsole } = require('../config/webpack.utils');
const config = configFactory('development');

const devServerOptions = { ...config.devServer, open: true };
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

const createCompiler = () => {
  let webpackCompiler;
  try {
    webpackCompiler = webpack(config);
  } catch (err) {
    console.log(chalk.red('Failed to compile.\n'));
    console.log(err.message || err);
    process.exit(1);
  }
  // 当更改了文件，并且正在编译时将触发
  webpackCompiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
  });
  let isFirstCompile = true;
  // 完成编译时触发
  webpackCompiler.hooks.done.tap('done', async (stats) => {
    if (isInteractive) {
      clearConsole();
    }
    // 关闭默认输出信息
    const statsData = stats.toJson({
      all: false,
      warnings: true,
      errors: true,
    });

    const messages = formatWebpackMessages(statsData);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      console.log(chalk.bgGreenBright('Compiled successfully!'));
    }
    if (isSuccessful && (isInteractive || isFirstCompile)) {
      console.log(
        `Starting server on ${chalk.cyanBright.bold(
          protocol + '://' + 'localhost:' + DEFAULT_PORT,
        )}`,
      );
      console.log(`On Network: ${chalk.cyan(protocol + '://' + ipv() + ':' + DEFAULT_PORT)}`);
    }
    isFirstCompile = false;
  });
  return webpackCompiler;
};
const compiler = createCompiler();
const devServer = new WebpackDevServer(devServerOptions, compiler);

devServer.startCallback(() => {
  if (isInteractive) {
    clearConsole();
  }
  console.log(chalk.cyan('Starting the development server...\n'));
});

['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, function () {
    devServer.close();
    process.exit();
  });
});

if (process.env.CI !== 'true') {
  // Gracefully exit when stdin ends
  process.stdin.on('end', function () {
    devServer.close();
    process.exit();
  });
}
