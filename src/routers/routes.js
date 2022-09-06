// 主路由
export const routes = [
  {
    path: '/',
    accsee: '',
    children: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: '首页',
        icon: 'home',
        component: './Home',
      },
      { path: '/app', name: 'APP', component: './App', icon: 'dashboard' },
      {
        path: '/system',
        name: '系统',
        icon: 'xitong',
        component: './System',
        children: [
          { path: '/system', redirect: '/system/dashboard/100' },
          {
            path: '/system/dashboard',
            name: '看板',
            icon: 'dashboard',
            component: './System',
          },
          {
            path: '/system/dashboard/:id',
            // name: 'params',
            hideInMenu: true,
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
