import React from 'react';
import {
  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
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
    title: 'Teams name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/teams/${record.id}`}>{text}</Link>,
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

const UserTeams = () => {
  const { loading, data } = useAuthQuery(CURRENT_USER_QUERY, {
    variables: {
      userId: 1,
    },
  });

  const createLeagueBtn = () => (
    <Button icon={<PlusOutlined />} type="primary">
      Create team
    </Button>
  );

  return (
    <>
      <TableWidget
        rowKey="id"
        title="Teams"
        pagination={{ pageSize: 15 }}
        loading={loading}
        dataSource={data?.user?.memberships?.organizations[0]?.leagues[0].teams}
        columns={columns}
        buttons={createLeagueBtn}
      />
    </>
  );
};

export default UserTeams;
