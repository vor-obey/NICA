import React from 'react';
import {
  Col,
} from 'antd';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { gql, useQuery } from '@apollo/client';
import styles from '../League/League.module.scss';
import TableWidget from '../../components/TableWidget';

export const LEAGUE_TEAMS_QUERY = gql`
    query leagueTeams($leagueId: ID!){
        league(id: $leagueId){
            id
            name{
                short
                formal
            }
            image
            season
            teams{
                id
                name
                createdAt
            }
        }
    }`;

const columns = [
  {
    key: 'name',
    title: 'Name',
    ellipsis: true,
    dataIndex: 'name',
    className: styles.tableColumn,
    render: (text, record) => <Link to={`/teams/${record.id}`}>{text}</Link>,
  },
  {
    ellipsis: true,
    key: 'createdAt',
    title: 'Created at',
    dataIndex: 'createdAt',
    className: styles.tableColumn,
    render: (value) => format(new Date(value), 'dd/MM/yyyy mm:HH'),
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

const Events = () => {
  const { data, loading } = useQuery(LEAGUE_TEAMS_QUERY, {
    variables: {
      leagueId: 1,
    },
  });

  return (
    <Col span={24}>
      <TableWidget
        title="Teams"
        columns={columns}
        loading={loading}
        dataSource={data?.league?.teams}
      />
    </Col>
  );
};

export default Events;
