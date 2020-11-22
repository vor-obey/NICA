import React from 'react';
import {
  Col, Image, Row, Typography,
} from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { SettingFilled } from '@ant-design/icons';
import TableWidget from '../../components/TableWidget';
import PageTitle from '../../components/PageTitle';

const { Title, Text } = Typography;

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
  const { data, loading } = useQuery(LEAGUE_CONFERENCES_QUERY, {
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
          columns={columns}
          loading={loading}
          title="Conferences"
          dataSource={data?.league?.conferences}
        />
      </Col>
    </Row>
  );
};

export default Events;
