import React from 'react';
import {
  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import LeagueTitle from '../LeagueTitle';
import TableWidget from '../../components/TableWidget';
import useAuthQuery from '../../../../hooks/useAuthQuery';
import { CURRENT_USER_QUERY } from '../../../../hooks/useCurrentUserQuery';

function confirm() {
  Modal.confirm({
    title: 'Deactivate',
    icon: <ExclamationCircleOutlined />,
    content: 'Deactivate league?',
    okText: 'Yes',
    cancelText: 'No',
  });
}

const columns = [
  {
    title: 'League name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/leagues/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Actions',
    key: 'actions',
    ellipsis: true,
    width: 150,
    align: 'center',
    render: () => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button icon={<EditOutlined />} />
        <Button onClick={confirm} danger icon={<DeleteOutlined />} />
      </div>
    ),
  },
];

const UserLeagues = () => {
  const { loading, data } = useAuthQuery(CURRENT_USER_QUERY, {
    variables: {
      userId: 1,
    },
  });

  console.log(data);

  const createLeague = () => {};

  const createLeagueBtn = () => (
    <Button icon={<PlusOutlined />} type="primary">
      Create league
    </Button>
  );

  return (
    <>
      <LeagueTitle />
      <TableWidget
        rowKey="id"
        title="Leagues"
        pagination={{ pageSize: 15 }}
        loading={loading}
        dataSource={data?.user?.memberships?.organizations[0]?.leagues}
        columns={columns}
        buttons={createLeagueBtn}
      />
    </>
  );
};

export default UserLeagues;
