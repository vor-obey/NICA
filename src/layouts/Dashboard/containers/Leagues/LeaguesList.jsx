import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Button, Col, Modal,
} from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TableWidget from '../../components/TableWidget';

export const LEAGUES_QUERY = gql`
    query leagues($leagueId: ID!){
        leagues
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
    ellipsis: true,
    dataIndex: 'league',
    render: (text, record) => <Link to={`/leagues/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Edit league',
    ellipsis: true,
    dataIndex: 'edit',
    fixed: 'right',
    width: 100,
    render: () => <Button>Edit</Button>,
  },
  {
    title: 'Deactivate league',
    ellipsis: true,
    dataIndex: 'league',
    fixed: 'right',
    width: 170,
    render: () => <Button onClick={confirm} danger>Deactivate</Button>,
  },
];

const LeaguesList = () => {
  const { loading, data } = useQuery(LEAGUES_QUERY, {
    variables: {
      leagueId: 1,
    },
  });

  const createLeagueBtn = () => (
    <Col>
      <Button icon={<PlusOutlined />} type="link">
        Create league
      </Button>
    </Col>
  );

  return (
    <TableWidget
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
