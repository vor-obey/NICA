import React from 'react';
import {
  Row, Col, Image, Typography, Skeleton, Button,
} from 'antd';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import SeasonInfo from './components/SeasonInfo';
import PageTitle from '../../components/PageTitle';
import SeasonSchedule from './components/SeasonSchedule';
import SeasonRegistrations from './components/SeasonRegistrations';
import SeasonRiderCategories from './components/SeasonRiderCategories';

const { Title, Text } = Typography;

export const SEASON_PROPS_QUERY = gql`
    query seasonProperties($seasonId: ID!, $leagueId: ID!){
        season(id: $seasonId){
            #general information
            id
            name
            startedAt
            divisionsCount
            league(id: $leagueId){
                id
                name
                image
            }
            #release of contact info
            contactInfoReleases#
            #mad mini info
            riderNewsletterId
            coachNewsletterId
            #teen trail corps           
            allowCoachesReportTTCHours

            #rider categories
            riderCategories{
                id
                name
                ridersCount
                grades
            }
            riderCategoriesAssigmentRules{
                id
                categoryName
                grade
            }
            # rider/coach/team season registraions
            registrations{
                role
                openedAt
                closedAt
                products{
                    name
                    price
                }
                lateFee
            }
            # season schedule
            events{
                type
                name
                allowedRidersStatus
                date
                open
            }
        }
    }
`;

// Before a rider's category placement is verified, each time the rider's grade is set or changed,
// the rider's category will then be automatically changed according to these rules. After the
// rider's category placement is verified, the category will not be changed automatically.

const Season = () => {
  const { seasonId, leagueId } = useParams();
  const { loading, data } = useQuery(SEASON_PROPS_QUERY, {
    variables: {
      seasonId,
      leagueId,
    },
  });

  return (
    <>
      <Row gutter={[0, 40]}>
        <Col span={24}>
          <PageTitle
            loading={loading}
            avatar={(
              <Image
                width={260}
                src={data?.season?.league?.image}
                fallback=""
              />
            )}
            title={(
              <Title>
                Season properties
              </Title>
            )}
            description={(
              <Text type="secondary">
                {`Season ${data?.season?.name} `}
              </Text>
            )}
          />
          <Skeleton active loading={loading} paragraph={false}>
            <Link to={`/leagues/${leagueId}/seasons/${seasonId}/edit`}>
              <Button type="primary">Edit</Button>
            </Link>
          </Skeleton>
        </Col>
        <Col span={24}>
          <SeasonInfo loading={loading} season={data?.season ?? {}} />
        </Col>
        <Col span={24}>
          <SeasonRiderCategories
            loading={loading}
            categories={data?.season?.riderCategories}
            riderCategoriesAssigmentRules={data?.season?.riderCategoriesAssigmentRules}
          />
        </Col>
        <Col span={24}>
          <SeasonRegistrations
            loading={loading}
            registrations={data?.season?.registrations}

          />
        </Col>
        <Col span={24}>
          <SeasonSchedule events={data?.season?.events} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default Season;
