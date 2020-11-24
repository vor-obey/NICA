import React from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  Card, Row, Col, Descriptions, Skeleton, Typography,
} from 'antd';
import Statistics from '../../components/Statistics';
import TableWidget from '../../components/TableWidget';

const { Title } = Typography;

const dateFormat = 'DD/MM/YYYY hh:mm A';

export const LEAGUE_DASHBOARD_QUERY = gql`
    query leagueDashboard($leagueId: ID!){
        leagueDashboard(id: $leagueId) {
            id
            name
            image
            season{
                id
                name
            }
            riderRegistrationStatus
            coachRegistrationStatus
            registrationContact
            weatherPolicyLink
            coachLitmosTeam
            timeZone
            createdAt
            updatedAt
            statistics {
                title
                value
            }
            admins(role: "admin"){
                id
                firstName
                lastName
                email
            }
        }
    }
`;

const adminColumns = [
  {
    key: 'full name',
    title: 'Full name',
    ellipsis: true,
    render: (text, record) => (
      <Link
        to={`/admins/${record.id}`}
      >
        {`${record.firstName} ${record.lastName}`}
      </Link>
    ),
  },
  {
    key: 'email',
    ellipsis: true,
    dataIndex: 'email',
    title: 'E-mail address',
  },
];

const LeagueDashboard = () => {
  const { leagueId } = useParams();
  const { data, loading } = useQuery(LEAGUE_DASHBOARD_QUERY, {
    variables: {
      leagueId,
    },
  });

  return (
    <Row gutter={[0, 60]}>
      <Col span={24}>
        <Statistics
          loading={loading}
          statistics={data?.leagueDashboard?.statistics ?? []}
        />
      </Col>
      <Col span={24}>
        <Card title={<Title level={2}>League Properties</Title>}>
          <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
            <Descriptions
              bordered
              column={2}
              layout="horizontal"
            >
              <Descriptions.Item label="Rider registration">
                {data?.leagueDashboard?.riderRegistrationStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Coach registration">
                {data?.leagueDashboard?.coachRegistrationStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Formal name">
                {data?.leagueDashboard?.name?.formal}
              </Descriptions.Item>
              <Descriptions.Item label="Short name">
                {data?.leagueDashboard?.name?.short}
              </Descriptions.Item>
              <Descriptions.Item label="Registration contact">
                {data?.leagueDashboard?.registrationContact}
              </Descriptions.Item>
              <Descriptions.Item label="Time zone">
                {data?.leagueDashboard?.timeZone}
              </Descriptions.Item>
              <Descriptions.Item label="Time Season">
                {data?.leagueDashboard?.season?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Weather Policy Link">
                {data?.leagueDashboard?.weatherPolicyLink}
              </Descriptions.Item>
              <Descriptions.Item label="Rider season fee registration message">
                {data?.leagueDashboard?.riderSeasonFeeRegistrationMessage}
              </Descriptions.Item>
              <Descriptions.Item label="Coach Litmos Team">
                {data?.leagueDashboard?.coachLitmosTeam}
              </Descriptions.Item>
              <Descriptions.Item label="Created at">
                {
                  moment(data?.leagueDashboard?.createdAt)
                    .format(dateFormat)
                }
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                {
                  moment(data?.leagueDashboard?.updatedAt)
                    .format(dateFormat)
                }
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Card>
      </Col>
      <Col span={24}>
        <TableWidget
          rowKey="id"
          columns={adminColumns}
          loading={loading}
          title="League admins"
          dataSource={data?.leagueDashboard?.admins}
        />
      </Col>
    </Row>

  );
};

export default LeagueDashboard;
