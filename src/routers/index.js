import { memo } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

import BasicLayout from '@/layout/BasicLayout';
import LazyLoad from './LazyLoad';

const renderRouter = (routerList) => {
  return routerList.map((item) => {
    const { path, children } = item;
    const layout = item.layout ?? true;
    // const token = localStorage.getItem('token');
    // console.log(token);
    // if (!noAuth && !token) return <Route path="*" element={<Navigate to="/login" />} />;
    if (!item.path) {
      return <Route key={item.to} path={item.from} element={LazyLoad(item.to)} />;
    }
    const ele = item.component && !layout ? LazyLoad(item.component) : <BasicLayout />;
    return (
      <Route
        key={path}
        exact={item.exact ?? true}
        path={path}
        element={item.redirect ? <Navigate to={item.redirect} /> : ele}
      >
        {!!children &&
          children.map((i) => {
            const iele = i.component && !i.layout ? LazyLoad(i.component) : <BasicLayout />;
            return (
              <Route
                key={i.path}
                exact={i.exact ?? true}
                path={i.path}
                element={i.redirect ? <Navigate to={i.redirect} /> : iele}
              />
            );
          })}
      </Route>
    );
  });
};

const Routers = (props) => {
  return (
    <Router>
      <Routes>{renderRouter(routes)}</Routes>
    </Router>
  );
};

export default memo(Routers);
