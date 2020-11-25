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

  const switchDrawer = useCallback(
    () => setIsDrawerVisible((v) => !v),
    [],
  );

  const { loading, data } = useQuery(DASHBOARD_USER_QUERY, {
    variables: {
      userId: 1,
    },
  });

  const leagueId = useMemo(() => data?.league?.id ?? null, [data]);

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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <SubMenu title="League" disabled={loading && !leagueId} icon={<CrownOutlined />}>
            <Menu.Item key={`/leagues/${leagueId}/dashboard`} icon={<DashboardOutlined />}>
              <Link to={`/leagues/${leagueId}/dashboard`}>Dashboard</Link>
            </Menu.Item>
          </SubMenu>
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
            <PrivateRoute path="/leagues/:leagueId" component={League} />
            <PrivateRoute exact path="/seasons/:seasonId" component={Season} />
            <PrivateRoute path="/seasons/:seasonId/edit" component={SeasonEdit} />
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
