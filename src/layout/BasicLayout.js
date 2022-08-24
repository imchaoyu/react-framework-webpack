import Icon from '@/components/IconFont';
import { routes } from '@/routers/routes';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
console.log('routes: ', routes);

function getItem(label, key, iconText, children) {
  const icon = iconText && <Icon name={iconText} />;
  const title = icon ?? label;
  return {
    key,
    icon,
    children,
    label,
    title,
  };
}

const title = '测试-';
const getMenuData = (list = routes) => {
  let menu = [];
  list.map((route) => {
    const isHide = route?.hideInMenu ?? false;
    const isLayout = route?.layout ?? true;
    (isHide || isLayout) &&
      route.name &&
      menu.push(
        getItem(
          route.name,
          route.path,
          route.icon,
          route.children && [...getMenuData(route.children)],
        ),
      );
  });
  return menu;
};
const menuData = getMenuData();

const BasicLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
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
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
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
