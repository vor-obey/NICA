import React from 'react';
import {
  Col,
} from 'antd';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import TableWidget from '../../components/TableWidget';

export const LEAGUE_CONFERENCES_QUERY = gql`
    query leagueConferences($leagueId: ID!){
        league(id: $leagueId){
            id
            name
            image
            season
            conferences{
                id
                name
                date
            }
        }
    }`;

const columns = [
  {
    key: 'name',
    title: 'Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/conferences/${record.id}`}>{text}</Link>,
  },
  {
    key: 'date',
    title: 'Date',
    ellipsis: true,
    dataIndex: 'date',
    render: (value) => format(new Date(value), 'dd/MM/yyyy mm:HH'),
  },
  {
    key: 'action',
    title: 'Actions',
    render: (test, record) => (
      <Link
        to={`/events/${record.id}`}
        type="primary"
      >
        Edit
      </Link>
    ),
  },
];

const Events = () => {
  const { data, loading } = useQuery(LEAGUE_CONFERENCES_QUERY, {
    variables: {
      leagueId: 1,
    },
  });

  return (
    <Col span={24}>
      <TableWidget
        columns={columns}
        loading={loading}
        title="Conferences"
        dataSource={data?.league?.conferences}
      />
    </Col>
  );
};

export default Events;
