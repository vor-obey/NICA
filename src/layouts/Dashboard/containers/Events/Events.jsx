import React from 'react';
import moment from 'moment';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import TableWidget from '../../components/TableWidget';

export const LEAGUE_EVENTS_QUERY = gql`
    query leagueEvents($leagueId: ID!){
        events(leagueId: $leagueId){
            id
            name
            date
        }
    }`;

const columns = [
  {
    title: 'Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/events/${record.id}`}>{text}</Link>,
  },
  {
    ellipsis: true,
    title: 'Event date',
    dataIndex: 'date',
    render: (value) => moment(value)
      .format('DD/MM/YYYY HH:mm'),
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
  const { leagueId } = useParams();
  const { data, loading } = useQuery(LEAGUE_EVENTS_QUERY, {
    variables: {
      leagueId,
    },
  });

  return (
    <TableWidget
      rowKey="id"
      columns={columns}
      loading={loading}
      title="Events"
      dataSource={data?.events ?? []}
    />
  );
};

export default Events;
