const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 是否使用了tailwind，默认否
const useTailwind = fs.existsSync(path.join('tailwind.config.js'));

const isProd = process.env.APP_ENV === 'production';
const isDev = process.env.APP_ENV === 'dev';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const resolveAPP = (_path) => path.resolve(__dirname, _path);

const getGlobalConstants = (__ENV__ = 'prod') => {
  console.log(1, __ENV__);
  const _path = `../envConfig/env.${__ENV__}.js`;
  const originalConstants = require(_path);
  const appliedConstants = {};
  Object.keys(originalConstants).forEach((key) => {
    appliedConstants[key] = JSON.stringify(originalConstants[key]);
  });
  return appliedConstants;
};
// 统一处理style loader
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isDev && require.resolve('style-loader'),
    isProd && {
      loader: MiniCssExtractPlugin.loader,
      // options: paths.publicUrlOrPath.startsWith('.') ? { publicPath: '../../' } : {},
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: !useTailwind
            ? [
                'postcss-flexbugs-fixes',
                [
                  'postcss-preset-env',
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  },
                ],
                'postcss-normalize',
              ]
            : [
                'tailwindcss',
                'postcss-flexbugs-fixes',
                [
                  'postcss-preset-env',
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  },
                ],
              ],
        },
        sourceMap: isProd ? shouldUseSourceMap : isDev,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isProd ? shouldUseSourceMap : isDev,
          root: resolveAPP('../src'),
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      },
    );
  }
  return loaders;
};

module.exports = {
  isDev,
  isProd,
  resolveAPP,
  getGlobalConstants,
  getStyleLoaders,
};
