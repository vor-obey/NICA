import React, { useCallback, useState } from 'react';
import {
  Layout,
  Button,
  Drawer,
} from 'antd';
import {
  SettingOutlined,
} from '@ant-design/icons';
import {
  Switch,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import Index from './containers/Index';
import Logo from '../../components/Logo';
import Coaches from './containers/Coaches';
import styles from './Dashboard.module.scss';
import { permissions } from '../../configs/app';
import NavBar from './components/NavBar/NavBar';
import LicenseStatus from './containers/LicenseStatus';
import PrivateRoute from '../../components/PrivateRoute';
import SpecificLeague from './containers/SpecificLeague';
import DashboardHeader from './components/DashboardHeader';
import LeaguesList from './containers/Leagues';
import Admin from './containers/Admin';
import Licenses from './containers/Licenses/Licenses';
import DashboardFooter from './components/DashboardFooter';

const { roles: ROLES } = permissions;
const {
  Sider, Content,
} = Layout;

const siderWidth = 270;
const siderCollapsedWidth = 80;

export const DASHBOARD_USER_QUERY = gql`
    query dashboardUser($userId: ID!){
        user(id: $userId){
            id
            firstName
            lastName
            image
            role
        }
    }`;

const Dashboard = () => {
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
        <NavBar theme="dark" mode="inline" />
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
            <PrivateRoute
              exact
              path="/"
              component={Index}
            />
            <PrivateRoute
              exact
              path="/leagues"
              component={LeaguesList}
              roles={[ROLES.SUPER_ADMIN]}
            />
            <PrivateRoute
              exact
              path="/coaches"
              component={Coaches}
            />
            <PrivateRoute
              exact
              path="/coaches/:coachId"
              component={Index}
            />
            <PrivateRoute
              exact
              path="/licenses"
              component={Licenses}
              roles={{
                exclude: [ROLES.COACH],
              }}
            />
            <PrivateRoute
              path="/leagues/:leagueId"
              component={SpecificLeague}
            />
            <PrivateRoute
              exact
              path="/licenses/:licenseId"
              component={LicenseStatus}
            />
            <PrivateRoute
              exact
              path="/admins/:adminId"
              component={Admin}
            />
          </Switch>
        </Content>
        <DashboardFooter />
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
