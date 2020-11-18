import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Skeleton,
  Row, Col,
  Descriptions,
} from 'antd';
import { Link } from 'react-router-dom';
import Statistics from '../../components/Statistics';
import TableWidget from '../../components/TableWidget';

const columns = [
  {
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
    title: 'E-mail address',
    ellipsis: true,
    dataIndex: 'email',
  },
];

export const LEAGUE_INFO_QUERY = gql`
    query leagueInfo($leagueId: ID!){
        league(id: $leagueId) {
            id
            name{
                short
                formal
            }
            season
            image
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

const League = () => {
  const { data, loading } = useQuery(LEAGUE_INFO_QUERY, {
    variables: {
      leagueId: 1,
    },
  });
  return (
    <Row gutter={[0, 40]}>
      <Col span={24}>
        <Statistics loading={loading} statistics={data?.league?.statistics ?? []} />
      </Col>
      <Col span={24}>
        <TableWidget
          columns={columns}
          loading={loading}
          title="League admins"
          dataSource={data?.league?.admins}
        />
      </Col>
      <Col span={24}>
        <Descriptions title="League Properties" bordered layout="vertical">
          <Descriptions.Item label="Rider registration">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.riderRegistrationStatus
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Coach registration">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.coachRegistrationStatus
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Formal name">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.name?.formal
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Short name">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.name?.short
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Registration contact">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.registrationContact
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Time zone">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.timeZone
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Time Season">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.season
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Weather Policy Link">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.weatherPolicyLink
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Rider season fee registration message">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.riderSeasonFeeRegistrationMessage
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Coach Litmos Team">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.coachLitmosTeam
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Created at">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.createdAt
              }
            </Skeleton>
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            <Skeleton loading={loading} paragraph={false} active>
              {
                data?.league?.updatedAt
              }
            </Skeleton>
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default League;
