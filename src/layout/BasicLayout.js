import Icon from '@/components/IconFont';
import { routes } from '@/routers/routes';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
console.log('routes: ', routes);

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
const getMenuData = (data = routes, parentAuthority) => {
  console.trace();
  return data.map((item) => {
    // if (item.layout === 'basic') {
    //   return getMenuData(item.children);
    // }
    const hasLayout = item.layout;
    const isHide = item.hideInMenu;
    if (!isHide && !item.redirect && !item.from) {
      const result = getItem({
        ...item,
        authority: item.authority || parentAuthority,
      });
      if (item.children) {
        const children = getMenuData(item.children, item.authority);
        result.children = children;
      }
      console.log('result: ', result);
      return result;
    }
  });
};

const getMenu = (list = routes, result = []) => {
  list.map((item) => {
    const menu = getItem(...item);
    if (item.children) {
      return getMenu(item.children, result);
    }
    return result.push(menu);
  });
};

const title = '测试-';
console.time('menu');
const menuData = getMenuData();
console.timeEnd('menu');
const BasicLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  console.log('menuData: ', menuData);
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
