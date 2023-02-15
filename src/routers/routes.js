// 主路由
export const routes = [
  {
    path: '/',
    accsee: '',
    children: [
      { path: '/', redirect: '/dashboard' },
      {
        path: '/dashboard',
        name: '看板',
        icon: 'dashboard',
        component: './Dashboard',
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
// 后台首页

// 网站管理
// 	栏目管理
// 	内容管理
// 	站点设置
// 	标签管理

// 用户管理
// 	用户中心
// 	角色管理
// 	管理员管理

// 系统设置
// 	系统设置
// 	管理菜单
