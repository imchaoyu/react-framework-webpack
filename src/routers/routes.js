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
        component: './Home',
      },
      { path: '/app', name: 'APP', component: './App' },
      {
        path: '/system',
        name: '系统',
        // component: './System',
        children: [
          { path: '/system', redirect: '/system/dashboard' },
          {
            path: '/system/dashboard/:id',
            name: '看板',
            component: './System',
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: '登录',
    layout: false,
    hideInMenu: true,
    component: './Login',
  },
  {
    from: '*',
    to: 'components/404/404',
  },
];
