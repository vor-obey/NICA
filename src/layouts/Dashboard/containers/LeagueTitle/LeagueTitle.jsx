import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { SettingFilled } from '@ant-design/icons';
import {
  Row, Col,
} from 'antd';
import {
  Link, useParams,
} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';

export const LEAGUE_INFO_QUERY = gql`
    query leagueInfo($leagueId: ID!){
        league(id: $leagueId){
            id
            name
            image
            season{
                id
                name
            }
        }
    }
`;

const LeagueTitle = () => {
  const { data, loading } = useQuery(LEAGUE_INFO_QUERY, {
    variables: {
      leagueId: 1,
    },
  });
  return (
    <Row gutter={[0, 60]}>
      <Col span={24}>
        <PageTitle
          loading={loading}
          avatar={data?.league?.image}
          title={`${data?.league?.name?.short ?? ''} league`}
          description={`Season ${data?.league?.season?.name ?? ''}`}
        />
      </Col>
    </Row>
  );
};

export default LeagueTitle;
