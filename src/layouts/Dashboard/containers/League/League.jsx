import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { SettingFilled } from '@ant-design/icons';
import {
  Skeleton,
  Row, Col,
  Descriptions,
  Image,
  Typography,
  Card,
} from 'antd';
import Statistics from '../../components/Statistics';
import TableWidget from '../../components/TableWidget';
import PageTitle from '../../components/PageTitle';

const { Title, Text } = Typography;
const columns = [
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
    title: 'E-mail address',
    ellipsis: true,
    dataIndex: 'email',

  },
];

export const LEAGUE_INFO_QUERY = gql`
    query leagueInfo($leagueId: ID!){
        league(id: $leagueId) {
            id
            name
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
        <Statistics
          loading={loading}
          statistics={data?.league?.statistics ?? []}
        />
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
        <Card title={<Title level={2}>League Properties</Title>}>
          <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
            <Descriptions
              bordered
              layout="vertical"
            >
              <Descriptions.Item label="Rider registration">
                {data?.league?.riderRegistrationStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Coach registration">
                {data?.league?.coachRegistrationStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Formal name">
                {data?.league?.name?.formal}
              </Descriptions.Item>
              <Descriptions.Item label="Short name">
                {data?.league?.name?.short}
              </Descriptions.Item>
              <Descriptions.Item label="Registration contact">
                {data?.league?.registrationContact}
              </Descriptions.Item>
              <Descriptions.Item label="Time zone">
                {data?.league?.timeZone}
              </Descriptions.Item>
              <Descriptions.Item label="Time Season">
                {data?.league?.season?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Weather Policy Link">
                {data?.league?.weatherPolicyLink}
              </Descriptions.Item>
              <Descriptions.Item label="Rider season fee registration message">
                {data?.league?.riderSeasonFeeRegistrationMessage}
              </Descriptions.Item>
              <Descriptions.Item label="Coach Litmos Team">
                {data?.league?.coachLitmosTeam}
              </Descriptions.Item>
              <Descriptions.Item label="Created at">
                {data?.league?.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                {data?.league?.updatedAt}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
};

export default League;
