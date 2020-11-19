import React from 'react';
import {
  Button, Col, Divider, Row,
} from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, PlusCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import TableWidget from '../../../components/TableWidget';
import styles from './Team.module.scss';
import Statistics from '../../../components/Statistics';

const columns = [
  {
    key: 'name',
    title: 'Coach Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/teams/coach/${record.id}`}>{text}</Link>,
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

const columnsEvents = [
  {
    key: 'name',
    title: 'Rider Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text, record) => <Link to={`/teams/event/${record.id}`}>{text}</Link>,
  },
  {
    key: 'racePlate',
    title: 'Race Plate',
    ellipsis: true,
    dataIndex: 'racePlate',
  },
  {
    key: 'grade',
    title: 'Grade',
    ellipsis: true,
    dataIndex: 'grade',
  },
  {
    key: 'category',
    title: 'Category',
    ellipsis: true,
    dataIndex: 'category',
  },
  {
    key: 'practiceReady',
    title: 'Practice Ready',
    ellipsis: true,
    dataIndex: 'practiceReady',
  },
  {
    key: 'events',
    title: 'Events',
    ellipsis: true,
    dataIndex: 'events',
  },
  {
    key: '1',
    title: '1',
    ellipsis: true,
    dataIndex: '1',
  },
  {
    ellipsis: true,
    key: 'TTCHours',
    title: 'TTC Hours',
    dataIndex: 'hours',
  },
];

const data = [
  {
    name: ['Andy Harber', <CheckCircleOutlined style={{ color: 'green', marginLeft: 20 }} />],
    level: 3,
    email: 'example@mail.ua',
    phone: 38099955542,
    hours: 0.0,
  },
];

const dataEvents = [
  {
    name: 'Abigaly Teryy',
    racePlate: 5261,
    grade: 5,
    category: 'Freshman',
    practiceReady: 'Yes',
    events: 'events',
    1: <CheckCircleOutlined style={{ color: 'green' }} />,
    hours: 0.0,
  },
];

const statisticsTeenTrail = [
  {
    title: 'Coaches',
    value: 5,
  },
  {
    title: 'Riders',
    value: 9,
  },
  {
    title: 'Other volunteers',
    value: 57,
  },
  {
    title: 'Total',
    value: 70,
  },
];

const statisticsTeamOverview = [
  {
    title: 'Registered Coaches',
    value: 9,
  },
  {
    title: 'Total Coaches',
    value: 7,
  },
  {
    title: 'Registered riders',
    value: 67,
  },
  {
    title: 'Total Riders',
    value: 40,
  },
];

const Team = () => {
  const renderButtonCoach = () => (
    <Row>
      <Col>
        <Button type="primary" icon={<DownloadOutlined />} size="large">
          Export Coaches CSV
        </Button>
      </Col>
      <Col>
        <Button type="primary" icon={<DownloadOutlined />} size="large" style={{ marginLeft: 15 }}>
          Export Coaches Emergency Contacts CSV
        </Button>
      </Col>
    </Row>
  );

  const renderButtonRider = () => (
    <Row>
      <Col>
        <Button type="primary" icon={<DownloadOutlined />} size="large">
          Export Rider Roster CSV
        </Button>
      </Col>
      <Col>
        <Button type="primary" icon={<DownloadOutlined />} size="large" style={{ marginLeft: 15 }}>
          Export Riders Emergency Contacts CSV
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <Col span={24} style={{ marginBottom: 40 }}>
        <Divider orientation="left">Team Overview</Divider>
        <Statistics statistics={statisticsTeamOverview} />
      </Col>
      <Col span={24} style={{ marginBottom: 40 }}>
        <Divider orientation="left">Teen Trail Corps Hours</Divider>
        <Statistics statistics={statisticsTeenTrail} />
      </Col>

      <Col span={24} style={{ marginBottom: 50 }}>
        <TableWidget
          columns={columns}
          title="Coaches"
          dataSource={data}
          buttons={renderButtonCoach}
        />
        <Row>
          <Button
            icon={<PlusCircleOutlined className={styles.buttonIcons} />}
            className={styles.underTableButton}
            type="primary"
            size="large"
          >
            Invite New Coaches
          </Button>
          <Button
            icon={<PlusCircleOutlined className={styles.buttonIcons} />}
            className={styles.underTableButton}
            type="primary"
            size="large"
          >
            Re-Invite Coaches to the New Season
          </Button>
        </Row>
      </Col>

      <Col span={24} style={{ marginBottom: 50 }}>
        <TableWidget
          columns={columnsEvents}
          title="Riders and Events"
          dataSource={dataEvents}
          buttons={renderButtonRider}
        />
        <Row>
          <Button
            icon={<PlusCircleOutlined className={styles.buttonIcons} />}
            className={styles.underTableButton}
            type="primary"
            size="large"
          >
            Invite New Riders
          </Button>
          <Button
            icon={<PlusCircleOutlined className={styles.buttonIcons} />}
            className={styles.underTableButton}
            type="primary"
            size="large"
          >
            Re-Invite Riders to the New Season
          </Button>
        </Row>
      </Col>
    </>
  );
};

export default Team;
