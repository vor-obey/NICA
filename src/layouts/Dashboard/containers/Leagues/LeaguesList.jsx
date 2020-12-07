import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Button, Modal,
} from 'antd';
import {
  ExclamationCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
} from '@ant-design/icons';
import TableWidget from '../../components/TableWidget';
import useAuthQuery from '../../../../hooks/useAuthQuery';

export const LEAGUES_QUERY = gql`
    query leagues($leagueId: ID!){
        leagues {
            name,
            id,
        }
    }`;

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
    title: 'Leagues name',
    key: 'league',
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

const LeaguesList = () => {
  const { loading, data } = useAuthQuery(LEAGUES_QUERY, {
    variables: {
      leagueId: 1,
    },
  });

  const createLeagueBtn = () => (
    <Button icon={<PlusOutlined />} type="primary">
      Create league
    </Button>
  );

  return (
    <TableWidget
      rowKey="id"
      title="Leagues"
      pagination={{ pageSize: 15 }}
      loading={loading}
      dataSource={data?.leagues}
      columns={columns}
      buttons={createLeagueBtn}
    />
  );
};

export default LeaguesList;
