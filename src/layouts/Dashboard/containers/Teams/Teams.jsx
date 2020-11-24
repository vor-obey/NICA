import React from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styles from '../League/League.module.scss';
import TableWidget from '../../components/TableWidget';

export const LEAGUE_TEAMS_QUERY = gql`
    query leagueTeams($leagueId: ID!){
        teams(leagueId: $leagueId){
            id
            name
            createdAt
        }
    }
`;

const columns = [
  {
    title: 'Name',
    ellipsis: true,
    dataIndex: 'name',
    className: styles.tableColumn,
    render: (text, record) => <Link to={`/teams/${record.id}`}>{text}</Link>,
  },
  {
    ellipsis: true,
    title: 'Created at',
    dataIndex: 'createdAt',
    className: styles.tableColumn,
    render: (value) => moment(value)
      .format('DD/MM/YYYY HH:mm'),
  },
  {
    key: 'action',
    title: 'Actions',
    className: styles.tableColumn,
    render: (test, record) => (
      <Link to={`/teams/${record.id}`}>
        Edit
      </Link>
    ),
  },
];

const Teams = () => {
  const { leagueId } = useParams();
  const { data, loading } = useQuery(LEAGUE_TEAMS_QUERY, {
    variables: {
      leagueId,
    },
  });

  return (
    <TableWidget
      title="Teams"
      columns={columns}
      loading={loading}
      dataSource={data?.teams ?? []}
    />
  );
};

export default Teams;
