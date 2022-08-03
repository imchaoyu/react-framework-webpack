const pkg = require('./package.json');
const getVersion = (param) => {
  return pkg.dependencies[param].split('^')[1];
};
const externals = {
  react: 'react',
  'react-dom': 'react-dom',
  antd: 'antd',
};

const cdn = {
  js: [
    'https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js',
    'https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
    'https://cdn.bootcdn.net/ajax/libs/antd/4.22.2/antd.min.js',
  ],
  css: ['https://cdn.bootcdn.net/ajax/libs/antd/4.22.2/antd.min.css'],
};

const CDNURL = {
  bootcdn: (module, value) => {
    return `https://cdn.bootcdn.net/ajax/libs/${module}/${getVersion(module)}/umd/${value}`;
  },
};

Object.entries(externals).map((entry) => {
  cdn.js.push(CDNURL.tcsl(entry[0], entry[1][1]));
});
