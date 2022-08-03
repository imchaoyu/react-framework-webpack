const pkg = require('../package.json');
const getVersion = (param) => {
  return pkg.dependencies[param].split('^')[1];
};

/**
 * dll列表
 * 数组说明：0:external使用，1:cdn的js，2:csn的css
 */
const dlllist = {
  react: ['React', 'umd/react.production.min.js'],
  'react-dom': ['ReactDOM', 'umd/react-dom.production.min.js'],
  // antd: ['antd', 'antd.min.js', 'antd.min.css'],
};

const externals = {};

const cdn = {
  js: [],
  css: [],
};

const CDNURL = {
  bootcdn: (module, value) => {
    return `https://cdn.bootcdn.net/ajax/libs/${module}/${getVersion(module)}/${value}`;
  },
};

Object.entries(dlllist).map((entry) => {
  cdn.js.push(CDNURL.bootcdn(entry[0], entry[1][1]));
  entry[1][2] && cdn.css.push(CDNURL.bootcdn(entry[0], entry[1][2]));
  externals[entry[0]] = entry[1][0];
});

module.exports = { cdn, externals };
