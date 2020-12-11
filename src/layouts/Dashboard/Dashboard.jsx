import React, { useCallback, useState } from 'react';
import {
  Layout,
  Button,
  Drawer,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Switch,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import Index from './containers/Index';
import Coaches from './containers/Coaches';
import styles from './Dashboard.module.scss';
import Licenses from './containers/Licenses';
import LeaguesList from './containers/Leagues';
import { permissions } from '../../configs/app';
import NavBar from './components/NavBar/NavBar';
import UserProfile from './containers/UserProfile';
import CoachLicense from './containers/CoachLicense';
import PrivateRoute from '../../components/PrivateRoute';
import SpecificLeague from './containers/SpecificLeague';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import Logo from '../../components/Logo';
import LicenseSteps from './containers/LicenseSteps';
import LicenseStatus from './containers/LicenseStatus/LicenseStatus';

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
  const switchSider = useCallback(
    () => setIsSiderCollapsed((v) => !v),
    [],
  );
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
      <Layout
        className={styles.layout}
      >
        <Sider
          collapsible
          theme="dark"
          trigger={null}
          breakpoint="md"
          width={siderWidth}
          onCollapse={onCollapse}
          className={styles.sider}
          collapsed={isSiderCollapsed}
          collapsedWidth={siderCollapsedWidth}
        >
          <div className={styles.siderInnerWrapper}>
            <Logo />
            <NavBar
              theme="dark"
              mode="inline"
            />
          </div>
        </Sider>
        <Layout className={styles.layoutInner}>
          <DashboardHeader
            loading={loading}
            user={data?.user}
            siderTrigger={(
              <Button
                type="text"
                size="large"
                onClick={switchSider}
                icon={isSiderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            )}
          />
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
                path="/coaches/:userId"
                component={UserProfile}
              />
              <PrivateRoute
                exact
                path="/leagues/:leagueId/admins/:userId"
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
                component={CoachLicense}
              />
              <PrivateRoute
                exact
                path="/licenses/:licenseId/step/:index"
                component={LicenseSteps}
                roles={[ROLES.COACH]}
              />
              <PrivateRoute
                exact
                path="/licenses/0/steps"
                component={LicenseStatus}
                roles={[ROLES.COACH]}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
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
  );
};

export default Dashboard;
