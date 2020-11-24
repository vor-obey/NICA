import React from 'react';
import {
  Row, Col, Skeleton,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import SeasonInfo from './components/SeasonInfo';
import PageTitle from '../../components/PageTitle';
import SeasonSchedule from './components/SeasonSchedule';
import SeasonRegistrations from './components/SeasonRegistrations';
import SeasonRiderCategories from './components/SeasonRiderCategories';

export const SEASON_PROPS_QUERY = gql`
    query seasonProperties($seasonId: ID!){
        season(id: $seasonId){
            #general information
            id
            name
            startedAt
            divisionsCount
            league{
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

const Season = () => {
  const { seasonId } = useParams();
  const { loading, data } = useQuery(SEASON_PROPS_QUERY, {
    variables: {
      seasonId,
    },
  });

  return (
    <Row gutter={[0, 60]}>
      <Col span={24}>
        <PageTitle
          loading={loading}
          avatar={data?.season?.league?.image}
          title="Season properties"
          description={(
            <Link to={`/seasons/${seasonId}/edit`}>
              {`Season ${data?.season?.name ?? ''}`}
              <EditOutlined />
            </Link>
          )}
        />
        <Skeleton active loading={loading} paragraph={false} />
      </Col>
      <Col span={24}>
        <SeasonInfo loading={loading} season={data?.season ?? {}} />
      </Col>
      <Col span={24}>
        <SeasonRiderCategories
          loading={loading}
          categories={data?.season?.riderCategories ?? []}
          riderCategoriesAssigmentRules={data?.season?.riderCategoriesAssigmentRules ?? []}
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
  );
};

export default Season;
