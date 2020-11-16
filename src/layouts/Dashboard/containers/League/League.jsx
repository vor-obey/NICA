import React, { useCallback, useMemo } from 'react';
import format from 'date-fns/format';
import { gql, useQuery } from '@apollo/client';
import { PlusOutlined } from '@ant-design/icons';
import {
  Row, Col,
  Button, Table,
  Statistic, Card,
  Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import styles from './League.module.scss';

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
const { Title } = Typography;

const commonTableColumns = [
  {
    key: 'name',
    title: 'Name',
    ellipsis: true,
    dataIndex: 'name',
    className: styles.tableColumn,
  },
  {
    ellipsis: true,
    key: 'birthdate',
    title: 'Birthdate',
    dataIndex: 'birthdate',
    className: styles.tableColumn,
    render: (value) => format(new Date(value), 'dd/MM/yyyy mm:HH'),
  },
  {
    key: 'action',
    title: 'Actions',
    className: styles.tableColumn,
    render: (test, record) => (
      <Link
        to={`/events/${record.id}?edit=true`}
        type="primary"
      >
        Edit
      </Link>
    ),
  },

];

export const League = () => {
  const { data: { league } = {}, loading } = useQuery(LEAGUE_QUERY, {
    variables: {
      leagueId: 1,
    },
  });

  const renderTableTitle = useCallback((title) => () => (
    <Row className={styles.tableTitleRow} justify="space-between">
      <Title style={{ margin: 0 }}>{title}</Title>
      <Button type="primary" icon={<PlusOutlined />} shape="circle" size="large" />
    </Row>
  ), []);

  const renderTableFooter = useCallback(() => (
    <Row justify="end">
      <Button type="primary" icon={<PlusOutlined />} shape="circle" size="large" />
    </Row>
  ), []);

  const tableProps = useMemo(() => ({
    loading,
    size: 'small',
    scroll: {
      x: true,
    },
    bordered: true,
    pagination: {
      pageSize: 6,
    },
    tableLayout: 'auto',
    style: {
      width: '100%',
    },
    columns: commonTableColumns,
  }), [loading]);

  return (
    <Row gutter={[0, 40]}>
      <Col span={24}>
        <Row gutter={20}>
          {
            league?.statistics?.map(({ name, value }) => (
              <Col key={name} flex="auto">
                <Card style={{ overflow: 'hidden' }}>
                  <Statistic
                    loading={loading}
                    title={name}
                    value={value}
                  />
                </Card>
              </Col>
            ))
          }
        </Row>
      </Col>
      <Col span={24}>
        <Table
          {...tableProps}
          footer={renderTableFooter}
          dataSource={league?.events}
          title={renderTableTitle('Events')}
        />
      </Col>
      <Col span={24}>
        <Table
          {...tableProps}
          dataSource={league?.teams}
          title={renderTableTitle('Teams')}
        />
      </Col>
      <Col span={24}>
        <Table
          {...tableProps}
          dataSource={league?.conferences}
          title={renderTableTitle('Conferences')}
        />
      </Col>
    </Row>
  );
};

export default League;
