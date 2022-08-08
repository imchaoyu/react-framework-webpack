import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

// import Loading from 'components/loading';
// import NotFind from 'components/notFind';

import { mainRouteConfig } from './routes';

const renderRouter = (routerList) => {
  return routerList.map((item) => {
    const { path, exact, noAuth, children } = item;
    const token = localStorage.getItem('token');
    // 无权限拦截
    if (!noAuth && !token)
      return <Route path="*" key={'login'} element={<Navigate to="/login" />} />;
    return (
      <Route key={path} exact={exact} path={path} element={<item.component />}>
        {!!children &&
          children.map((i) => {
            return <Route key={i.path} exact={i.exact} path={i.path} element={<i.component />} />;
          })}
      </Route>
    );
  });
};

const Routers = (props) => {
  return (
    <Router>
      <React.Suspense fallback={<>loading...</>}>
        <Routes>
          {renderRouter(mainRouteConfig)}
          {/* 404 */}
          <Route path="*" element={<>404,to login</>} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default React.memo(Routers);
