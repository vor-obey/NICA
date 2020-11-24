import React from 'react';
import moment from 'moment';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import TableWidget from '../../components/TableWidget';

export const LEAGUE_CONFERENCES_QUERY = gql`
    query leagueConferences($leagueId: ID!){
        conferences{
            id
            name
            date
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

const Conferences = () => {
  const { leagueId } = useParams();
  const { data, loading } = useQuery(LEAGUE_CONFERENCES_QUERY, {
    variables: {
      leagueId,
    },
  });

  return (
    <TableWidget
      rowKey="id"
      columns={columns}
      loading={loading}
      title="Conferences"
      dataSource={data?.conferences ?? []}
    />
  );
};

export default Conferences;
