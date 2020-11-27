import React from 'react';
import {
  Button, Col, Popover, Row,
} from 'antd';
import { DownloadOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styles from '../Leagues/League/League.module.scss';
import TableWidget from '../../components/TableWidget';

export const COACH_QUERY = gql`
    query teamData($teamId: ID!){
        coaches (id: $teamId){
            coach {
                id,
                league,
                name,
                level,
                email,
                phone,
                hours
            },
            role,
        },
    }`;

const columns = {
  COACH: [{
    key: 'name',
    title: 'Coach Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/coaches/${record.id}`}>{text}</Link>,
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
  ],
  SUPER_ADMIN: [
    {
      key: 'league',
      title: 'Leagues',
      ellipsis: true,
      dataIndex: 'league',
      render: (text, record) => <Link to={`/leagues/${record.id}`}>{text}</Link>,
    },
    {
      key: 'name',
      title: 'Coach Name',
      ellipsis: true,
      dataIndex: 'name',
      render: (text, record) => <Link to={`/coaches/${record.id}`}>{text}</Link>,
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
  ],
  LEAGUE_ADMIN: [{
    key: 'name',
    title: 'Coach Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/coaches/${record.id}`}>{text}</Link>,
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
  ],
};

const Coaches = () => {
  const { loading, data } = useQuery(COACH_QUERY, {
    variables: {
      teamId: 1,
    },
  });

  const role = data?.coaches?.role;

  // const renderButtonCoach = () => (
  //   <Row>
  //     <Popover
  //       placement="left"
  //       content={(
  //         <div className={styles.popoverLinks}>
  //           <a target="_blank" rel="noopener noreferrer" href="/#">Export Coaches CSV</a>
  //           <a target="_blank" rel="noopener noreferrer" href="/#">Emergency Contacts CSV</a>
  //         </div>
  //       )}
  //       trigger="click"
  //     >
  //       <DownloadOutlined className={styles.buttonIcons} />
  //     </Popover>
  //   </Row>
  // );

  const SAdminButtons = () => (
    <div className={styles.marginLinks}>
      <Row align="end">
        <Button type="link" className={styles.buttonLinks}>
          <MinusOutlined className={styles.positionBtn} />
          Deactivate coach
        </Button>
      </Row>
      <Row align="end">
        <Button type="link" className={styles.buttonLinks}>
          <PlusOutlined className={styles.positionBtn} />
          Invite New Coaches
        </Button>
      </Row>
    </div>
  );

  const LAdminButtons = () => (
    <Row align="end">
      <Button type="link" className={styles.buttonLinks}>
        <PlusOutlined className={styles.positionBtn} />
        Invite New Coaches
      </Button>
    </Row>
  );

  const SUPER_ADMIN = role === 'SUPER_ADMIN';
  const LEAGUE_ADMIN = role === 'LEAGUE_ADMIN';
  // eslint-disable-next-line no-nested-ternary
  const access = SUPER_ADMIN ? SAdminButtons : LEAGUE_ADMIN ? LAdminButtons : '';
  return (
    <Col span={24} style={{ marginBottom: 50, marginTop: 50 }}>
      <TableWidget
        rowKey="id"
        pagination={{ pageSize: 15 }}
        columns={columns[role] || []}
        loading={loading}
        title="Coaches"
        dataSource={data?.coaches?.coach}
        footer={access}
      />
    </Col>
  );
};

export default Coaches;
