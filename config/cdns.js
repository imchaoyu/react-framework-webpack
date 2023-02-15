const pkg = require('../package.json');
const env = process.env.APP_ENV;
const getVersion = (param) => pkg.dependencies[param].split('^')[1];

/**
 * dll列表
 * 数组说明：
 * key:三方库名称，
 * value:三方库全局变量（key，value供externals使用），
 * dev:开发环境链接，
 * prod:生产环境链接,
 * css:css链接
 */
const DLLLIST = [
  {
    key: 'react',
    value: 'React',
    dev: 'umd/react.development.min.js',
    prod: 'umd/react.production.min.js',
  },
  {
    key: 'react-dom',
    value: 'ReactDOM',
    dev: 'umd/react-dom.development.min.js',
    prod: 'umd/react-dom.production.min.js',
  },
];

const externals = {};

const cdn = {
  js: [],
  css: [],
};

const CDNURL = {
  bootcdn: (module, value) =>
    `https://cdn.bootcdn.net/ajax/libs/${module}/${getVersion(
      module,
    )}/${value}`,
};

DLLLIST.map((entry) => {
  cdn.js.push(CDNURL.bootcdn(entry.key, entry[env]));
  entry.css && cdn.css.push(CDNURL.bootcdn(entry.key, entry.css));
  externals[entry.key] = entry.value;
});

module.exports = { cdn, externals };
