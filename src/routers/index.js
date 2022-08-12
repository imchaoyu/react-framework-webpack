import { lazy, memo, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Loading from '@/components/Loading';
import BasicLayout from '@/layout/BasicLayout';
import { routes } from './routes';

//
const lazyLoad = (path) => {
  if (!path) return;
  const regPath = path.replace('./', '');
  console.log('`@/pages/${regPath}`: ', `@/pages/${regPath}`);
  return lazy(() => import(`@/pages/${regPath}`));
};

const renderRouter = (routerList) => {
  return routerList.map((item) => {
    const { path, children } = item;
    const layout = item.layout ?? true;
    // const token = localStorage.getItem('token');
    // console.log(token);
    // if (!noAuth && !token) return <Route path="*" element={<Navigate to="/login" />} />;
    // const ele = LazyLoad(item.component);
    // console.log(item.component, ele);
    if (!item.path) {
      return <Route path={item.from} element={<item.to />} />;
    }
    const ele = item.component && !layout ? <item.component /> : <BasicLayout />;

    return (
      <Route
        key={path}
        exact={item.exact ?? true}
        path={path}
        element={item.redirect ? <Navigate to={item.redirect} /> : ele}
      >
        {!!children &&
          children.map((i) => {
            const iele = i.component && !i.layout ? <i.component /> : <BasicLayout />;
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
      <Suspense fallback={<Loading />}>
        <Routes>{renderRouter(routes)}</Routes>
      </Suspense>
    </Router>
  );
};

export default memo(Routers);
