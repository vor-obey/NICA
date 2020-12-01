import React from 'react';
import {
  Button, Col,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import TableWidget from '../../components/TableWidget';
import { permissions } from '../../../../configs/app';
import Permissions from '../../../../components/Permissions';
import useAuthQuery from '../../../../hooks/useAuthQuery';

export const COACH_QUERY = gql`
    query teamData($teamId: ID!){
        coaches (id: $teamId){
            coach {
                id,
                league,
                image,
                name,
                level,
                email,
                phone,
                hours,
            },
            role,
        },
    }`;

const columns = {
  [permissions.roles.COACH]: [{
    key: 'name',
    title: 'UserProfile Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/coaches/${record.id}`}>{text}</Link>,
  },
  {
    ellipsis: true,
    key: 'level',
    title: 'Level',
    dataIndex: 'level',
    align: 'center',
  },
  {
    ellipsis: true,
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    ellipsis: true,
    key: 'phone',
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    ellipsis: true,
    key: 'TTCHours',
    title: 'TTC Hours',
    dataIndex: 'hours',
    width: 70,
  },
  ],
  [permissions.roles.SUPER_ADMIN]: [
    {
      key: 'league',
      title: 'Leagues',
      ellipsis: true,
      dataIndex: 'league',
      render: (text, record) => <Link to={`/leagues/${record.id}`}>{text}</Link>,
    },
    {
      key: 'name',
      title: 'UserProfile Name',
      ellipsis: true,
      dataIndex: 'name',
      render: (text, record) => <Link to={`/coaches/${record.id}`}>{text}</Link>,
    },
    {
      ellipsis: true,
      key: 'level',
      title: 'Level',
      dataIndex: 'level',
      align: 'center',
    },
    {
      ellipsis: true,
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      ellipsis: true,
      key: 'phone',
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      ellipsis: true,
      key: 'TTCHours',
      title: 'TTC Hours',
      dataIndex: 'hours',
      align: 'center',
      width: 70,
    },
  ],
  [permissions.roles.LEAGUE_ADMIN]: [{
    key: 'name',
    title: 'UserProfile Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/coaches/${record.id}`}>{text}</Link>,
  },
  {
    ellipsis: true,
    key: 'level',
    title: 'Level',
    dataIndex: 'level',
    align: 'center',
  },
  {
    ellipsis: true,
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    ellipsis: true,
    key: 'phone',
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    ellipsis: true,
    key: 'TTCHours',
    title: 'TTC Hours',
    dataIndex: 'hours',
    width: 70,
    align: 'center',
  },
  ],
};

const Coaches = () => {
  const { loading, data } = useAuthQuery(COACH_QUERY, {
    variables: {
      teamId: 1,
    },
  });

  const role = data?.coaches?.role;

  const inviteCoaches = () => (
    <Permissions roles={[permissions.roles.LEAGUE_ADMIN, permissions.roles.SUPER_ADMIN]}>
      <Button type="primary" icon={<PlusOutlined />}>
        Invite New Coaches
      </Button>
    </Permissions>
  );

  // eslint-disable-next-line no-nested-ternary
  return (
    <Col
      span={24}
    >
      <TableWidget
        rowKey="id"
        pagination={{ pageSize: 15 }}
        columns={columns[role] || []}
        loading={loading}
        title="Coaches"
        dataSource={loading ? null : data?.coaches?.coach}
        buttons={inviteCoaches}
      />
    </Col>
  );
};

export default Coaches;
