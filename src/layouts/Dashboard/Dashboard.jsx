/* eslint react/no-array-index-key: 0 */
import React, { useCallback, useState } from 'react';
import {
  Button,
  Menu,
  Layout,
  Drawer,
} from 'antd';
import {
  HomeOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Switch, Link, useLocation } from 'react-router-dom';
import { gql } from '@apollo/client';
import Index from './containers/Index';
import Logo from '../../components/Logo';
import styles from './Dashboard.module.scss';
import League from './containers/League';
import PrivateRoute from '../../components/PrivateRoute';

const {
  Header, Sider, Content,
} = Layout;

const siderWidth = 270;
const siderCollapsedWidth = 80;

export const DASHBOARD_USER_QUERY = gql`
    query dashboardUser($userId: ID!){
        user (id: $userId){
            id
            firstName
            lastName
        }
        league{
            id
            name
            image
            season {
                year
            }
        }
    }`;

const Dashboard = () => {
  const location = useLocation();
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
  const onCollapse = useCallback((v) => setIsSiderCollapsed(v), []);
  const onClickCollapseBtnHandle = useCallback(() => setIsSiderCollapsed((v) => !v), []);
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <Layout>
      <Sider
        className={styles.sider}
        collapsible
        collapsed={isSiderCollapsed}
        width={siderWidth}
        collapsedWidth={siderCollapsedWidth}
        onCollapse={onCollapse}
      >
        <Logo />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/league" icon={<CrownOutlined />}>
            <Link to="/league">League</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className={styles.layout}
        style={{
          marginLeft: isSiderCollapsed ? siderCollapsedWidth : siderWidth,
        }}
      >
        <Header className={styles.header}>
          <Button
            size="large"
            onClick={onClickCollapseBtnHandle}
            icon={isSiderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content className={styles.content}>
          <Switch>
            <PrivateRoute path="/" exact component={Index} />
            <PrivateRoute path="/league" component={League} />
          </Switch>
        </Content>
        <MenuUnfoldOutlined
          onClick={showDrawer}
          style={{
            position: 'fixed',
            top: 80,
            right: 20,
            color: 'black',
            zIndex: 10,
            fontSize: 25,
          }}
        />
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable
          onClose={onClose}
          visible={visible}
          key="right"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
