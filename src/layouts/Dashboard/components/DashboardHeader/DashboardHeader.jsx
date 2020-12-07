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

const DashboardHeader = ({
  user, siderTrigger, loading, ...props
}) => {
  const { role, setRole } = useContext(RoleContext);

  return (
    <Header className={styles.header} {...props}>
      <Row justify="space-between">
        <Col>
          {siderTrigger}
        </Col>
        <Col>
          <Select
            style={{
              width: 200,
              marginRight: 40,
            }}
            defaultValue={role}
            onChange={(v) => {
              localStorage.setItem('role', v);
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
            paragraph={false}
          >
            <Dropdown
              trigger={['click', 'hover']}
              overlay={menu}
              className={styles.dropDown}
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
