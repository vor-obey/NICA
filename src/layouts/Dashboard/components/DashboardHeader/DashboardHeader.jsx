import React from 'react';
import {
  Menu,
  Card,
  Avatar,
  Layout,
  Skeleton,
  Dropdown,
  Row,
  Col,
} from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import styles from './DashboardHeader.module.scss';

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);

const DashboardHeader = ({ user, loading }) => (

  <Header className={styles.header}>
    <Row justify="end">
      <Col>
        <Skeleton
          avatar={{
            size: 'large',
            shape: 'circle',
          }}
          loading={loading}
          active
          title={{ width: 160 }}
          paragraph={false}
        >
          <Dropdown
            trigger={['click', 'hover']}
            overlay={menu}
            style={{
              maxWidth: 250,
              overflow: 'hidden',
            }}
          >
            <Card.Meta
              className={styles.userItem}
              avatar={(
                <Avatar
                  size="large"
                  src={user?.image}
                  icon={<UserOutlined />}
                />
              )}
              title={`${user?.firstName} ${user?.lastName}`}
            />
          </Dropdown>
        </Skeleton>
      </Col>
    </Row>
  </Header>
);

export default DashboardHeader;
