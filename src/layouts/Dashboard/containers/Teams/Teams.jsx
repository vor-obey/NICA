import React from 'react';
import {
  Col, Image, Row, Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { gql, useQuery } from '@apollo/client';
import { SettingFilled } from '@ant-design/icons';
import styles from '../League/League.module.scss';
import TableWidget from '../../components/TableWidget';
import PageTitle from '../../components/PageTitle';

const { Title, Text } = Typography;

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
    <Row gutter={[0, 60]}>
      <Col span={24}>
        <PageTitle
          loading={loading}
          avatar={(
            <Image
              width={260}
              src={data?.league?.image}
              fallback=""
            />
          )}
          title={(
            <Title>
              {`${data?.league?.name?.short} league`}
            </Title>
          )}
          description={(
            <Link to={`/leagues/${data?.league?.id}/seasons/${data?.league?.season?.id}`}>
              <Text type="secondary">
                {`Season ${data?.league?.season?.name} `}
                <SettingFilled />
              </Text>
            </Link>
          )}
        />
      </Col>

      <Col span={24}>
        <TableWidget
          title="Teams"
          columns={columns}
          loading={loading}
          dataSource={data?.league?.teams}
        />
      </Col>
    </Row>
  );
};

export default Events;
