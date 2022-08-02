const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin =require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve, getGlobalConstants } = require('./webpack.utils')

const devServer = require('../devConfig/devServer');

// webpack公共配置
module.exports = (env) => {
    const isDev = env.__ENV__ === 'dev'
    process.env.NODE_ENV = isDev ? 'development': 'production';
    const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;
    const config = {
        mode: isDev ? 'development': 'production',
        entry: {
            index: resolve('../src/index')
        },
        output: {
            path: resolve('../dist'),
            filename: 'js/[name].bundle.[contenthash:8].js',  // index.js 被打包出来的文件
            chunkFilename: 'js/[name].chunk.[contenthash:8].js',
            // assetModuleFilename: 'assets/[hash][ext]', //引用资源文件打包后的文件名
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
                    use: [styleLoader, 'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: () => [ // postcss的插件
                                    require('postcss-preset-env')()
                                ]
                            }
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    }],
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
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: resolve('../src/index.html'),
                favicon: resolve('../src/static/favicon.png'),
                minify: { // 对html压缩
                    collapseWhitespace: true, // 移除空格
                    removeComments: true // 移除注释
                }
            }),
            // 配置全局的常量
            new webpack.DefinePlugin(getGlobalConstants(env.__ENV__)),
            // copy 静态目录的资源
            new copyWebpackPlugin({
                patterns: [{
                    from: './public', // 从哪个目录
                    to: '../dist',  // copy到哪个目录，默认是output到输出路径
                    globOptions: {
                        ignore: ['.*']
                    }
                }]
            }),
        ],
        // 解析
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.cjs', '.css', '.less'],
            alias: {  // 配置别名
                '@': resolve('../src'),
            }
        },
        devtool: isDev?'eval-cheap-module-source-map':false,
        // 优化 
        optimization: {
            moduleIds: isDev?'named':'deterministic',
            chunkIds: isDev?'named':'deterministic',
            minimize: isDev?false:true,  // 开发环境下不启用压缩
            runtimeChunk: { name: 'runtime' },
            minimizer: ['...', new CssMinimizerPlugin()],  // '...' 使用默认值(TerserPlugin)
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|axios|history|scheduler|react-is|prop-types|object-assign|mini-create-react-context|hoist-non-react-statics|resolve-pathname|value-equal|tiny-invariant)[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: 100,
                    },
                },
            }
        },
    }
    // 配置时区分环境
    if(isDev) {
        config.devServer = devServer;
    }else{
        config.plugins.push(
            new MiniCssExtractPlugin({
                // prod模式下分离css文件, 对输出的css文件进行重命名
                filename: 'css/[name].bundle.[contenthash:8].css',
                chunkFilename: 'css/[name].chunk.[contenthash:8].css',
            })
        )
    }
    return config;
}
