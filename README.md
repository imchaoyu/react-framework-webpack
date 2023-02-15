# react-framework-webpack

> 基于 webpack5 开发的 React 脚手架，继承 React-Router-Dom v6

# 启动

```bash
# 无mock
npm run dev
# mock
npm run start
# 打包
npm run build
# 查看分析打包情况
npm run analyze
```

# 功能列表

- [x] layout 布局
- [x] react-route-dom v6
- [x] 可配置式路由
- [x] 可配置式菜单，根据当前路由生成面包屑
- [x] axios 数据请求
- [x] 引入 Ant Design
- [x] ESLint+Prettier 代码格式化规范
- [x] Less 样式处理
- [x] 使用 webpack 5 缓存处理提高打包速度
- [x] Mock 模拟数据
- [ ] 状态管理
- [ ] 单元测试
- [ ] 优化路由配置处理
- [ ] 发布 npm 包，根据配置生成脚手架代码
- [ ] 权限

# 目录结构

```
├───config
├───dist
├───mock
├───public
├───script
└───src
    ├───.cache
    │   ├───default-development
    │   └───default-production
    ├───components
    │   ├───404
    │   ├───IconFont
    │   └───Loading
    ├───layout
    ├───pages
    │   ├───Home
    │   ├───Login
    │   └───System
    ├───routers
    ├───services
    └───utils
```

# 配置式路由格式

位于 `src\routers\routes.js` 内，格式采取如下形式：

```javascript
{
   path: '/',
   accsee: '',
   children: [
     { path: '/', redirect: '/home' },
   ]
},
{
   path: '/login',
   name: '登录',
   layout: false,
   hideInMenu: true,
   component: './Login',
 },
```

有`layout`且是同一个`layout`布局的统一放在一个对象内，如上，只有一个`layout`，所以所有组件页面放在一个对象中，登录等页面不需要`layout`布局，所以分散在各个同`layout`布局对象同等的对象中。

> 特别说明： 暂时只支持一个`layout`的布局，且对象是在路由数组中的第一个。

> 一直使用 UMI，升级最新版后觉得 UMI 越来越重，遂产生了自己开发一个脚手架的想法，跟适用与自己的平时开发。还有很多不足之处，有缘看到该项目，希望您能够指正批评。
