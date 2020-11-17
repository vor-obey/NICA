import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Row, Col,
  Statistic, Card,
} from 'antd';

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

const League = () => {
  const { data: { league } = {}, loading } = useQuery(LEAGUE_QUERY, {
    variables: {
      leagueId: 1,
    },
  });
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
    </Row>
  );
};

export default League;
