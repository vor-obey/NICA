/* eslint react/no-array-index-key: 0 */
import {
  Row,
  Col,
  Menu,
  Layout,
} from 'antd';
import { HomeOutlined, CrownOutlined } from '@ant-design/icons';
import React, { useState, useCallback } from 'react';
import { Switch, Link } from 'react-router-dom';

import styles from './Admin.module.scss';
import Logo from '../../components/Logo';
import Index from './containers/Index';
import PrivateRoute from '../../components/PrivateRoute';
import ToggleButton from './components/ToggleButton/ToggleMenuButton';
import { League } from './containers/League';

const { Header, Sider, Content } = Layout;

const Home = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const onClickToggleBtnHandle = useCallback(
    () => setIsNavCollapsed((v) => !v),
    [setIsNavCollapsed],
  );

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={isNavCollapsed}>
        <Logo className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CrownOutlined />}>
            <Link to="/league">League</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.siteLayoutBackground}>
        <Header className={styles.pageHeader}>
          <Row justify="space-between">
            <Col>
              <ToggleButton isOpen={isNavCollapsed} onClick={onClickToggleBtnHandle} />
            </Col>
            <Col />
          </Row>
        </Header>
        <Content
          className={styles.siteLayoutBackground}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <PrivateRoute path="/" exact component={Index} />
            <PrivateRoute path="/league" component={League} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
