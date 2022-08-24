// 主路由
export const routes = [
  {
    path: '/',
    name: '首页',
    icon: 'home',
    accsee: '',
    children: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: '首页',
        component: 'pages/Home',
      },
      { path: '/app', name: 'APP', component: 'pages/App' },
      {
        path: '/system',
        name: '系统',
        component: 'pages/System',
      },
    ],
  },
  {
    path: '/login',
    name: '登录',
    layout: false,
    component: 'pages/Login',
  },
  {
    from: '*',
    to: 'components/404/404',
  },
];
