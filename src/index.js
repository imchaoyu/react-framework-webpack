import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (process.env.MOCK) {
  require('../mock');
  console.log('%c前端 mock 环境启动成功', 'color: green;font-weight: bold');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
