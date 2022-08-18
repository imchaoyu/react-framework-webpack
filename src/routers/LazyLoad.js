// 路由懒加载的封装
import { NotFound } from '@/components/404';
import Loading from '@/components/Loading';
import { lazy, Suspense } from 'react';

const LazyLoad = (path) => {
  if (!path) return <NotFound />;
  const Component = lazy(() => import(`../${path}`));
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default LazyLoad;
