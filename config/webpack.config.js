const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { isDev, isProd, resolveAPP } = require('./webpack.utils');
const { cdn, externals } = require('./cdns');

const devServer = {
  // 开发环境本地启动的服务配置
  static: {
    directory: resolveAPP('../dist'),
  },
  port: 3000,
  // 自动打开浏览器
  // open: true,
  hot: true,
  // 服务器代理 --> 解决开发环境跨域问题
  // proxy: devProxy,
  historyApiFallback: true, // 当找不到路径时，默认加载index.html
  client: {
    // 不显示[webpack-dev-server]的log
    logging: 'none',
  },
};

module.exports = function (env) {
  // 提取css
  const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;
  // 配置
  const config = {
    stats: isDev ? 'minimal' : 'normal',
    // 生产环境编辑错误时退出
    bail: isProd,
    mode: isDev ? 'development' : 'production',
    entry: {
      index: resolveAPP('../src/index'),
    },
    output: {
      path: resolveAPP('../dist'),
      filename: isDev
        ? 'static/js/[name].[contenthash:4].js'
        : 'static/js/[name].[contenthash:8].js',
      chunkFilename: isDev
        ? 'static/js/[name].[contenthash:4].chunk.js'
        : 'static/js/[name].[contenthash:8].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
      pathinfo: false,
    },
    // 设置缓存提升打包速度
    cache: {
      type: 'filesystem',
      cacheDirectory: resolveAPP('../src/.cache'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx|mjs|cjs)$/, // 匹配哪些文件
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: /\.(css|less)$/,
          use: [
            styleLoader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: () => [
                    // postcss的插件
                    require('postcss-preset-env')(),
                  ],
                },
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
          sideEffects: true,
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: 'assets/images/[hash][ext]',
          },
        },
        { test: /\.(woff(2)?|eot|ttf|otf)$/, type: 'asset/fonts' },
        // {
        //   test: /\.css$/,
        //   exclude: /node_modules/,
        //   use: getStyleLoaders({
        //     importLoaders: 1,
        //     modules: {
        //       mode: 'icss',
        //     },
        //   }),
        //   sideEffects: true,
        // },
        // {
        //   test: /\.less$/,
        //   exclude: /node_modules/,
        //   use: getStyleLoaders(
        //     {
        //       importLoaders: 3,
        //       modules: {
        //         mode: 'icss',
        //       },
        //     },
        //     'less-loader',
        //   ),
        //   sideEffects: true,
        // },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: resolveAPP('../public/index.html'),
            favicon: resolveAPP('../public/favicon.png'),
            cdn,
          },
          isProd
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined,
        ),
      ),
      // 进度条
      new ProgressBarPlugin({
        format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
      }),
      // 热更新
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      // 定义全局变量
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('../package.json').version}"`,
        'process.env': {
          MOCK: process.env.MOCK,
          APP_ENV: process.env.APP_ENV,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      // lodash按需加载
      new LodashModuleReplacementPlugin(),
      // 忽略moment locale模块
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      // 分析
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
        generateStatsFile: true, // 是否生成stats.json文件
      }),
    ],
    optimization: {
      moduleIds: isDev ? 'named' : 'deterministic',
      chunkIds: isDev ? 'named' : 'deterministic',
      minimize: isProd, // 开发环境下不启用压缩
      runtimeChunk: { name: 'runtime' },
      minimizer: [
        new TerserPlugin({
          parallel: 4,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isProd && process.argv.includes('--profile'),
            keep_fnames: isProd && process.argv.includes('--profile'),
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            // node_modules里的代码
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            // name: 'vendors', 一定不要定义固定的name
            priority: 10, // 优先级
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.cjs', '.css', '.less'],
      alias: {
        // 配置别名
        '@': resolveAPP('../src'),
        '@api': resolveAPP('../src/services'),
      },
    },
    externals,
    devtool: isDev ? 'eval-cheap-module-source-map' : false,
  };
  if (isDev) config.devServer = devServer;
  return config;
};
