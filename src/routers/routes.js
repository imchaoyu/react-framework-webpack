//index.js
import { NotFound } from '@/components/404';
import { lazy } from 'react';

// const BasicLayout = lazy(() => import(/* webpackChunkName: "Layout" */ '@/layout'));
const App = lazy(() => import(/* webpackChunkName: "Layout" */ '@/pages/App'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ '@/pages/Login'));
const System = lazy(() => import(/* webpackChunkName: "System" */ '@/pages/System'));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ '@/pages/Home'));

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
        component: Home,
      },
      { path: '/app', name: 'APP', icon: 'smile', component: App },
      {
        path: '/system',
        name: '系统',
        icon: 'smile',
        component: System,
      },
    ],
  },
  {
    path: '/login',
    name: '登录',
    layout: false,
    component: Login,
  },
  {
    from: '*',
    to: NotFound,
  },
];
