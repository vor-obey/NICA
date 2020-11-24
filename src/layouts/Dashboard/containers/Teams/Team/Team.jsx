import React from 'react';
import {
  Col, Divider, Row, Popover, Image, Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  DownloadOutlined, PlusOutlined, MinusOutlined,
} from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import TableWidget from '../../../components/TableWidget';
import styles from './Team.module.scss';
import Statistics from '../../../components/Statistics';
import PageTitle from '../../../components/PageTitle';
import LeagueLogo from './Lea.png';

const { Title, Text } = Typography;

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
            riders {
            name,
            racePlate,
            grade,
            category,
            practiceReady,
            events,
            hours,
                state,
            }
        }
    }`;

const columns = [
  {
    key: 'name',
    title: 'Coach Name',
    ellipsis: true,
    dataIndex: 'name',
    render: (text) => <Link to="coach">{text}</Link>,
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
    key: 'state',
    title: 'State',
    ellipsis: true,
    dataIndex: 'state',
  },
  {
    ellipsis: true,
    key: 'TTCHours',
    title: 'TTC Hours',
    dataIndex: 'hours',
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
  const { loading, data } = useQuery(TEAM_QUERY, {
    variables: {
      teamId: 1,
    },
  });

  const renderButtonCoach = () => (
    <Row>
      <Popover
        placement="left"
        content={(
          <div className={styles.popoverLinks}>
            <a target="_blank" rel="noopener noreferrer" href="/#">Export Coaches CSV</a>
            <a target="_blank" rel="noopener noreferrer" href="/#">Emergency Contacts CSV</a>
          </div>
)}
        trigger="click"
      >
        <DownloadOutlined className={styles.buttonIcons} />
      </Popover>
    </Row>
  );

  const renderButtonRider = () => (
    <Row>
      <Popover
        placement="left"
        content={(
          <div className={styles.popoverLinks}>
            <a target="_blank" rel="noopener noreferrer" href="/#">Export Riders CSV</a>
            <a target="_blank" rel="noopener noreferrer" href="/#">Emergency Contacts CSV</a>
          </div>
        )}
        trigger="click"
      >
        <DownloadOutlined className={styles.buttonIcons} />
      </Popover>
    </Row>
  );

  return (
    <>
      <PageTitle
        loading={loading}
        title={<Title style={{ fontSize: '2vmax' }}>Allatoona Creek Composite</Title>}
        avatar={<Image style={{ marginRight: 20 }} src={LeagueLogo} />}
        description={<Text style={{ fontSize: '1.5vmax' }} type="secondary">Season 2020</Text>}
      />

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
          loading={loading}
          title="Coaches"
          dataSource={data?.team?.coaches}
          buttons={renderButtonCoach}
          footer={() => (
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
          )}
        />
      </Col>

      <Col span={24} style={{ marginBottom: 50 }}>
        <TableWidget
          columns={columnsEvents}
          title="Riders and Events"
          dataSource={data?.team?.riders}
          buttons={renderButtonRider}
          footer={() => (
            <div className={styles.marginLinks}>
              <Row align="end">
                <a target="_blank" rel="noopener noreferrer" href="/#" className={styles.buttonLinks}>
                  <MinusOutlined className={styles.positionBtn} />
                  Re-Invite Riders to the New Season
                </a>
              </Row>
              <Row align="end">
                <a target="_blank" rel="noopener noreferrer" href="/#" className={styles.buttonLinks}>
                  <PlusOutlined className={styles.positionBtn} />
                  Invite New Riders
                </a>
              </Row>
            </div>
          )}
        />
      </Col>
    </>
  );
};

export default Team;
