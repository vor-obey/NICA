import React from 'react';
import { Col, Row } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styles from '../Leagues/League/League.module.scss';
import TableWidget from '../../components/TableWidget';

export const TEAM_QUERY = gql`
    query teamData($teamId: ID!){
        team (id: $teamId){
            coaches {
                id,
                name,
                level,
                email,
                phone,
                hours
            },
        },
    }`;

const columns = [
  {
    key: 'name',
    title: 'Coach Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/coach/${record.id}`}>{text}</Link>,
  },
  {
    ellipsis: true,
    key: 'level',
    title: 'Level',
    dataIndex: 'level',
  },
  {
    ellipsis: true,
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
  },
  {
    ellipsis: true,
    key: 'phone',
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    ellipsis: true,
    key: 'TTCHours',
    title: 'TTC Hours',
    dataIndex: 'hours',
  },
];

const Coaches = ({ buttons }) => {
  const { loading, data } = useQuery(TEAM_QUERY, {
    variables: {
      teamId: 1,
    },
  });

  const footer = (
    <div className={styles.marginLinks}>
      <Row align="end">
        <a target="_blank" rel="noopener noreferrer" href="/#" className={styles.buttonLinks}>
          <MinusOutlined className={styles.positionBtn} />
          Re-Invite Coaches to the New Season
        </a>
      </Row>
      <Row align="end">
        <a target="_blank" rel="noopener noreferrer" href="/#" className={styles.buttonLinks}>
          <PlusOutlined className={styles.positionBtn} />
          Invite New Coaches
        </a>
      </Row>
    </div>
  );

  return (
    <Col span={24} style={{ marginBottom: 50, marginTop: 50 }}>
      <TableWidget
        rowKey="id"
        pagination={{ pageSize: 15 }}
        columns={columns}
        loading={loading}
        title="Coaches"
        dataSource={data?.team?.coaches}
        buttons={buttons}
      />
    </Col>
  );
};

export default Coaches;
