import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  Row, Col, Typography, Image,
} from 'antd';
import PageTitle from '../../components/PageTitle';
import SeasonInfoEdit from './components/SeasonInfoEdit';
import SeasonRiderCategoriesEdit from './components/SeasonRiderCategoriesEdit';
import SeasonRegistrationsEdit from './components/SeasonRegistrationsEdit';

const { Title, Text } = Typography;

export const SEASON_EDIT_PROPS_QUERY = gql`
    query seasonEditProperties($seasonId: ID!, $leagueId: ID!){
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
            contactsInfoReleases#
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

const SeasonEdit = () => {
  const { seasonId, leagueId } = useParams();

  const { loading, data, error } = useQuery(SEASON_EDIT_PROPS_QUERY, {
    variables: {
      leagueId,
      seasonId,
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
              {`Season ${data?.season?.name}`}
            </Text>
          )}
        />
      </Col>
      <Col span={24}>
        <SeasonInfoEdit loading={loading} season={data?.season ?? {}} />
      </Col>
      <Col span={24}>
        <SeasonRiderCategoriesEdit
          loading={loading}
          categories={data?.season?.riderCategories ?? []}
        />
      </Col>
      <Col span={24}>
        <SeasonRegistrationsEdit
          loading={loading}
          registrations={data?.season?.registrations ?? []}
        />
      </Col>
    </Row>
  );
};

export default SeasonEdit;
