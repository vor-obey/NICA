import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styles from './Admin.module.scss';

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [isNavCollapsed, setIsNavCollped] = useState(false);

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={isNavCollapsed}>
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.siteLayoutBackground}>
        <Header className={styles.siteLayoutBackground} style={{ padding: 0 }}>
          {React.createElement(isNavCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: styles.trigger,
            onClick: () => setIsNavCollped((v) => !v),
          })}
        </Header>
        <Content
          className={styles.siteLayoutBackground}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
