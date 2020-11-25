import React, { useCallback, useMemo, useState } from 'react';
import {
  Menu,
  Layout,
  Button,
  Drawer,
} from 'antd';
import {
  HomeOutlined,
  CrownOutlined,
  SettingOutlined,
  DashboardOutlined,
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
import Season from './containers/Season';
import styles from './Dashboard.module.scss';
import SeasonEdit from './containers/SeasonEdit';
import PrivateRoute from '../../components/PrivateRoute';
import DashboardHeader from './components/DashboardHeader';
import routes from './routes';
import SiderNavBar from './components/SiderNavBar/SiderNavBar';

const {
  Sider, Content,
} = Layout;
const { SubMenu } = Menu;

const siderWidth = 270;
const siderCollapsedWidth = 80;

export const DASHBOARD_USER_QUERY = gql`
    query dashboardUser($userId: ID!){
        user (id: $userId){
            id
            firstName
            lastName
            image
            role
        }
        league{
            id
            name
            image
            season
        }
    }`;

// eslint-disable-next-line no-shadow
const renderRoutes = (routes) => routes.map((route) => (
  <PrivateRoute
    key={route.name}
    {...route}
  />
));

const Dashboard = () => {
  const location = useLocation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
  const onCollapse = useCallback((v) => setIsSiderCollapsed(v), []);

  const switchDrawer = useCallback(
    () => setIsDrawerVisible((v) => !v),
    [],
  );

  const { loading, data } = useQuery(DASHBOARD_USER_QUERY, {
    variables: {
      userId: 1,
    },
  });

  const {
    routes: dashboardRoutes,
    params: dashboardParams,
  } = useMemo(() => {
    if (data) {
      const { user: { role }, league: { id: leagueId } } = data;
      return {
        routes: routes.filter((route) => route?.permissions?.includes(role)),
        params: { leagueId },
      };
    }
    return {
      routes: [],
      params: {},
    };
  }, [data]);
  return (
    <Layout>
      <Sider
        collapsible
        theme="dark"
        breakpoint="md"
        width={siderWidth}
        onCollapse={onCollapse}
        className={styles.sider}
        collapsed={isSiderCollapsed}
        collapsedWidth={siderCollapsedWidth}
      >
        <Logo />
        <SiderNavBar
          theme="dark"
          mode="inline"
          params={dashboardParams}
          routes={dashboardRoutes}
        />
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
            {renderRoutes(dashboardRoutes)}
          </Switch>
        </Content>
        <Drawer
          closable
          key="right"
          placement="right"
          onClose={switchDrawer}
          title="Basic Drawer"
          visible={isDrawerVisible}
          handler={(
            <Button
              type="primary"
              onClick={switchDrawer}
              className={styles.drawerBtn}
              icon={<SettingOutlined className={styles.drawerBtnIcon} />}
            />
          )}
        />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
