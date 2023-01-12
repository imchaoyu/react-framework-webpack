import { memo } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { routes } from './routes';

import BasicLayout from '@/layout/BasicLayout';
import LazyLoad from './LazyLoad';

const renderRouter = (router) =>
  router.map((item, index) => {
    if (!item.path) {
      return (
        <Route key={item.to} path={item.from} element={LazyLoad(item.to)} />
      );
    }
    const basic = item?.layout === 'basic';
    const ele =
      item.component && !basic ? LazyLoad(item.component) : <BasicLayout />;
    return (
      <Route
        key={item.path}
        path={item.path}
        exact={item.exact ?? true}
        element={item.redirect ? <Navigate to={item.redirect} /> : ele}
        {...(item.props = {})}
      >
        {item.children && renderRouter(item.children)}
      </Route>
    );
  });

const Routers = (props) => (
  <Router>
    <Routes>{renderRouter(routes)}</Routes>
  </Router>
);

export default memo(Routers);
