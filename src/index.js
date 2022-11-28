import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import Router from './routers';

console.log('process.env: ', process.env);
if (process.env.MOCK && 'development' === process.env.APP_ENV) {
  require('../mock');
  console.log('%c前端 mock 环境启动成功', 'color: green;font-weight: bold');
}
// 路由
const RenderRouter = () => {
  // const state= useSelection()
  return <Router login="true" />;
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RenderRouter />
  </React.StrictMode>,
);
