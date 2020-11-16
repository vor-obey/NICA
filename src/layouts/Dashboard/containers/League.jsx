import React from 'react';
import format from 'date-fns/format';
import { gql, useQuery } from '@apollo/client';
import { PlusOutlined } from '@ant-design/icons';
import {
  Row, Col,
  Button, Spin, Table,
  Typography, Card, Statistic,
} from 'antd';

export const LEAGUE_QUERY = gql`
    query leagueInfo($leagueId: ID!){
        league(id: $leagueId) {
            id,
            name,
            season,
            image,
            teams {
                id,
                name,
                birthdate,
            },
            events {
                id,
                name,
                birthdate,
            },
            conferences {
                id,
                name,
                birthdate,
            },
            statistics {
                name,
                value
            }
        }
    }
`;

const commonTableColumns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
    ellipsis: true,
  },
  {
    key: 'birthdate',
    title: 'Birthdate',
    dataIndex: 'birthdate',
    render: (value) => format(new Date(value), 'dd/MM/yyyy mm:HH'),
    ellipsis: true,
  },
  {
    title: 'Actions',
    key: 'action',
    render: () => <Button type="primary">Edit</Button>,
  },

];

const { Title } = Typography;

export const League = () => {
  const { data: { league } = {}, loading } = useQuery(LEAGUE_QUERY, {
    variables: {
      leagueId: 1,
    },
  });

  if (loading) {
    return <Spin size="large" />;
  }

  const tableProps = {
    loading,
    size: 'small',
    tableLayout: 'auto',
    bordered: true,
    pagination: {
      pageSize: 6,
    },
    style: {
      width: '100%',
    },
    columns: commonTableColumns,
    scroll: {
      x: true,
    },
  };
  return (
    <Row gutter={[0, 40]}>
      <Col span={24}>
        <Card title={<Title level={2}>Statistics</Title>}>
          <Row gutter={[20, 20]} justify="space-evenly">
            {
              league.statistics.map(({ name, value }) => (
                <Col key={name}>
                  <Card>
                    <Statistic title={name} value={value} />
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Table
          {...tableProps}
          dataSource={league.events}
          title={() => <Title level={2}>Events</Title>}
        />
      </Col>
      <Col span={24}>
        <Table
          {...tableProps}
          dataSource={league.teams}
          title={() => (
            <Row justify="space-between" align="middle">
              <Title level={2}>Teams</Title>
              <Button
                size="large"
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
              />
            </Row>
          )}
        />
      </Col>
      <Col span={24}>
        <Table
          {...tableProps}
          dataSource={league.conferences}
          title={() => <Title level={2}>Conferences</Title>}
        />
      </Col>
    </Row>
  );
};

export default League;
