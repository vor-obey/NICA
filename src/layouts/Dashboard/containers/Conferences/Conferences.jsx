import React, { useCallback, useMemo } from 'react';
import {
  Button, Col, Row, Table, Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { useQuery } from '@apollo/client';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../League/League.module.scss';
import { LEAGUE_QUERY } from '../League/League';

const { Title } = Typography;

const conferencesTableColumns = [
  {
    key: 'name',
    title: 'Name',
    ellipsis: true,
    dataIndex: 'name',
    className: styles.tableColumn,
    render: (text, record) => <Link to={`/conferences/${record.id}`}>{text}</Link>,
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

const Conferences = () => {
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
  }), [loading]);
  return (
    <Col span={24}>
      <Table
        {...tableProps}
        columns={conferencesTableColumns}
        dataSource={league?.conferences}
        title={renderTableTitle('Conferences')}
      />
    </Col>
  );
};

export default Conferences;
