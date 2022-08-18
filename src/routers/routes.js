// 主路由
export const routes = [
  {
    path: '/',
    name: '首页',
    icon: 'smile',
    accsee: '',
    children: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: '首页',
        icon: 'Home',
        component: 'pages/Home',
      },
      { path: '/app', name: 'APP', icon: 'smile', component: 'pages/App' },
      {
        path: '/system',
        name: '系统',
        icon: 'smile',
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
