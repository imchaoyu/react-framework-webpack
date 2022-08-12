// 路由懒加载的封装
import { lazy } from 'react';

const LazyLoad = (path) => {
  if (!path) return;
  const pathname = path.replace('./', '');
  const Comp = lazy(() => import('@/pages/' + pathname));
  console.log('Comp: ', Comp, <Comp />);
  return <Comp />;
};

export default LazyLoad;
