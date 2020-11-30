import React, { useContext } from 'react';
import {
  Menu,
  Card,
  Avatar,
  Layout,
  Skeleton,
  Dropdown,
  Row,
  Col,
  Select,
} from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import styles from './DashboardHeader.module.scss';
import { permissions } from '../../../../configs/app';
import RoleContext from '../../../../roleContext';

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);

const DashboardHeader = ({ user, loading }) => {
  const { role, setRole } = useContext(RoleContext);
  return (

    <Header className={styles.header}>
      <Row justify="end">
        <Col>
          <Select
            style={{
              width: 200,
              marginRight: 40,
            }}
            defaultValue={localStorage.getItem('role') ?? permissions.roles.SUPER_ADMIN}
            onChange={(v) => {
              setRole(v);
            }}
          >
            {
              Object.values(permissions.roles)
                .map((r) => (<Select.Option key={r} value={r}>{r}</Select.Option>))
            }
          </Select>
        </Col>
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
};

export default DashboardHeader;
