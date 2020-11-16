/* eslint react/no-array-index-key: 0 */
import React, { useCallback, useState } from 'react';
import {
  Button,
  Menu,
  Layout,
  Image,
} from 'antd';
import {
  HomeOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Switch, Link, useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Index from './containers/Index';
import Logo from '../../components/Logo';
import styles from './Dashboard.module.scss';
import { League } from './containers/League';
import PrivateRoute from '../../components/PrivateRoute';

const {
  Header, Sider, Content, Footer,
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
  const { data } = useQuery(DASHBOARD_USER_QUERY, {
    variables: {
      userId: 1,
    },
  });
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
  const onCollapse = useCallback((v) => setIsSiderCollapsed(v), []);
  const onClickCollapseBtnHandle = useCallback(() => setIsSiderCollapsed((v) => !v), []);

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
          <Image src={data?.league?.image} alt={data?.league?.name} />
        </Header>
        <Content className={styles.content}>
          <Switch>
            <PrivateRoute path="/" exact component={Index} />
            <PrivateRoute path="/league" component={League} />
          </Switch>
        </Content>
        <Footer>
          Footer
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
