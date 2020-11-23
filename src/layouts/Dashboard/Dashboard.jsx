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
  TeamOutlined,
  CalendarOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import {
  Switch,
  Link,
  useLocation,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import Index from './containers/Index';
import League from './containers/League';
import Logo from '../../components/Logo';
import styles from './Dashboard.module.scss';
import Teams from './containers/Teams/Teams';
import Events from './containers/Events/Events';
import PrivateRoute from '../../components/PrivateRoute';
import DashboardHeader from './components/DashboardHeader';
import Conferences from './containers/Conferences/Conferences';
import Team from './containers/Teams/Team/Team';
import Coach from './containers/Coach/Coach';

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
          <Menu.Item key="/teams" icon={<TeamOutlined />}>
            <Link to="/teams">Teams</Link>
          </Menu.Item>
          <Menu.Item key="/events" icon={<CalendarOutlined />}>
            <Link to="/events">Events</Link>
          </Menu.Item>
          <Menu.Item key="/conferences" icon={<PieChartOutlined />}>
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
            <PrivateRoute exact path="/events/:id">Events</PrivateRoute>
            <PrivateRoute exact path="/teams/:id" component={Team} />
            <PrivateRoute exact path="/conferences/:id">Conferences</PrivateRoute>
            <PrivateRoute exact path="/coach" component={Coach} />
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
