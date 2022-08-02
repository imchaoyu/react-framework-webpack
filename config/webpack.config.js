const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {
  isDev,
  isProd,
  resolveAPP,
  getGlobalConstants,
  getStyleLoaders,
} = require('./webpack.utils');
// import defaultSettings from './defaultSettings';
const defaultSettings = require('./defaultSettings');

const devServer = {
  // 开发环境本地启动的服务配置
  static: {
    directory: resolveAPP('../dist'),
  },
  // 端口号
  port: 3000,
  // 自动打开浏览器
  open: true,
  // 开启HMR（热模块替换）功能, 当修改了webpack配置，新配置要想生效，必须重新webpack服务
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
  console.log('env: ', env);
  // 图片、文件大小限制
  const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');
  // 配置
  const config = {
    stats: 'errors-warnings',
    // 生产环境编辑错误时退出
    bail: isProd,
    mode: isDev ? 'development' : 'production',
    entry: {
      index: resolveAPP('../src/index'),
    },
    output: {
      path: resolveAPP('../dist'),
      filename: isDev ? 'static/js/bundle.js' : 'static/js/[name].[contenthash:8].js',
      chunkFilename: isDev
        ? 'static/js/[name].chunk.js'
        : 'static/js/[name].[contenthash:8].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
    },
    // 设置缓存提升打包速度
    cache: true,
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
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
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx|mjs|cjs)$/, // 匹配哪些文件
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: [/\.avif$/],
          type: 'asset',
          mimetype: 'image/avif',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
        },
        // {
        //   test: /\.css$/,
        //   use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
        //   exclude: /node_modules/,
        // },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              mode: 'icss',
            },
          }),
          sideEffects: true,
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              modules: {
                mode: 'icss',
              },
            },
            'less-loader',
          ),
          sideEffects: true,
        },
        {
          exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          type: 'asset/resource',
        },
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
            title: defaultSettings.title,
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
      // new webpack.DefinePlugin({
      //   PUBLIC_URL: resolveAPP('../public'),
      // }),
      // new HtmlWebpackPlugin({
      //   template: resolveAPP('../public/index.html'),
      //   minify: {
      //     // 对html压缩
      //     collapseWhitespace: true, // 移除空格
      //     removeComments: true, // 移除注释
      //   },
      // }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.cjs', '.css', '.less'],
      alias: {
        // 配置别名
        '@': resolveAPP('../src'),
        '@api': resolveAPP('../src/api'),
      },
    },
    optimization: {},
    devtool: isDev ? 'cheap-module-source-map' : false,
  };
  if (isDev) config.devServer = devServer;
  return config;
};
