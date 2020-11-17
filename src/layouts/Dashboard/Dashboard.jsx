/* eslint react/no-array-index-key: 0 */
import React, { useCallback, useState } from 'react';
import {
  Menu,
  Layout,
  Drawer,
} from 'antd';
import {
  HomeOutlined,
  CrownOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import {
  Route,
  Switch,
  Link,
  useLocation,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import Index from './containers/Index';
import League from './containers/League';
import Logo from '../../components/Logo';
import styles from './Dashboard.module.scss';
import PrivateRoute from '../../components/PrivateRoute';
import DashboardHeader from './components/DashboardHeader';
import Events from './containers/Events/Events';
import Conferences from './containers/Conferences/Conferences';
import Teams from './containers/Teams/Teams';

const {
  Sider, Content,
} = Layout;
const siderWidth = 270;
const siderCollapsedWidth = 80;

export const DASHBOARD_USER_QUERY = gql`
    query dashboardUser($userId: ID!){
        user (id: $userId){
            id
            firstName
            lastName
            image
        }
        league{
            id
            name
            image
            season
        }
    }`;

const Dashboard = () => {
  const location = useLocation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
  const onCollapse = useCallback((v) => setIsSiderCollapsed(v), []);

  const closeDrawer = useCallback(() => {
    setIsDrawerVisible(false);
  }, [setIsDrawerVisible]);

  const openDrawer = useCallback(() => {
    setIsDrawerVisible(true);
  }, [setIsDrawerVisible]);

  const { loading, data } = useQuery(DASHBOARD_USER_QUERY, {
    variables: {
      userId: 1,
    },
  });

  return (
    <Layout>
      <Sider
        collapsible
        breakpoint="md"
        width={siderWidth}
        onCollapse={onCollapse}
        className={styles.sider}
        collapsed={isSiderCollapsed}
        collapsedWidth={siderCollapsedWidth}
      >
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/league" icon={<CrownOutlined />}>
            <Link to="/league">League</Link>
          </Menu.Item>
          <Menu.Item key="/teams" icon={<CrownOutlined />}>
            <Link to="/teams">Teams</Link>
          </Menu.Item>
          <Menu.Item key="/events" icon={<CrownOutlined />}>
            <Link to="/events">Events</Link>
          </Menu.Item>
          <Menu.Item key="/conferences" icon={<CrownOutlined />}>
            <Link to="/conferences">Conferences</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className={styles.layout}
        style={{
          marginLeft: isSiderCollapsed ? siderCollapsedWidth : siderWidth,
        }}
      >
        <DashboardHeader loading={loading} user={data?.user} />
        <Content className={styles.content}>
          <Switch>
            <PrivateRoute path="/" exact component={Index} />
            <PrivateRoute path="/league" component={League} />
            <PrivateRoute exact path="/events" component={Events} />
            <PrivateRoute exact path="/teams" component={Teams} />
            <PrivateRoute exact path="/conferences" component={Conferences} />
            <PrivateRoute path="/events/:id">Events</PrivateRoute>
            <PrivateRoute path="/teams/:id">Teams</PrivateRoute>
            <PrivateRoute path="/conferences/:id">Conferences</PrivateRoute>
          </Switch>
        </Content>
        <MenuFoldOutlined
          onClick={openDrawer}
          className={styles.drawerBtn}
        />
        <Drawer
          closable
          key="right"
          placement="right"
          onClose={closeDrawer}
          title="Basic Drawer"
          visible={isDrawerVisible}
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
