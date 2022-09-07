import Icon from '@/components/IconFont';
import { routes } from '@/routers/routes';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

// antd menu数据转化
const getItem = (item) => {
  if (!item.name) return;
  const icon = item.icon && <Icon name={item.icon} />;
  const title = icon ?? item.name;
  return {
    key: item.path,
    icon,
    children: item.children,
    label: item.name,
    title,
  };
};
// 根据路由配置生成菜单
const getMenuData = (data = routes, parentAuthority) => {
  const firstRoute = data[0];
  if (!firstRoute.layout && !firstRoute.name && !firstRoute.icon && firstRoute.children) {
    return getMenuData(firstRoute.children);
  }
  return data.map((item) => {
    const isHide = item.hideInMenu;
    if (!isHide && !item.redirect && !item.from) {
      const result = getItem({
        ...item,
        authority: item.authority || parentAuthority,
      });
      if (item.name && item.children) {
        const children = getMenuData(item.children, item.authority);
        result.children = children;
      }
      console.count('getMenuData');
      return result;
    }
  });
};

// 根据路由配置生成面包屑
const getBreadcrumbNameMap = () => {
  const routerMap = {};
  const mergeMenuAndRouter = (data) => {
    data.forEach((menuItem) => {
      if (menuItem.children) {
        mergeMenuAndRouter(menuItem.children);
      }
      // Reduce memory usage
      if (menuItem.path !== '/' && menuItem.name) {
        routerMap[menuItem.path] = menuItem.name;
      }
    });
  };
  mergeMenuAndRouter(routes[0].children);
  return routerMap;
};

const title = '测试-';
console.time('menu');
const menuData = getMenuData().filter(Boolean);
console.timeEnd('menu');
const breadcrumbMaps = getBreadcrumbNameMap();
console.log('breadcrumbMaps: ', breadcrumbMaps);
const BasicLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const pathSnippets = location.pathname.split('/').filter((i) => i);
  // 面包屑
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbMaps[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  console.count('menuData: ');
  const [title, setTitle] = useState('');

  const [collapsed, setCollapsed] = useState(false);
  const handlerMenuClick = (info) => {
    navigate(info.key);
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>
      </HelmetProvider>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultOpenKeys={['/']}
            defaultSelectedKeys={['/home']}
            mode="inline"
            items={menuData}
            onClick={handlerMenuClick}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: '0 10px',
              background: '#fff',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              {breadcrumbItems}
            </Breadcrumb>
          </Header>
          <Content
            style={{
              margin: '16px',
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            react-admin
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default BasicLayout;
