import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import {
  Row, Col,
} from 'antd';
import PageTitle from '../../components/PageTitle';
import SeasonInfoEdit from './components/SeasonInfoEdit';
import SeasonRiderCategoriesEdit from './components/SeasonRiderCategoriesEdit';
import SeasonRegistrationsEdit from './components/SeasonRegistrationsEdit';

export const SEASON_EDIT_PROPS_QUERY = gql`
    query seasonEditProperties($seasonId: ID!){
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
  const { seasonId } = useParams();

  const { loading, data } = useQuery(SEASON_EDIT_PROPS_QUERY, {
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
            <Link to={`/seasons/${seasonId}`}>
              {`Season ${data?.season?.name ?? ''}`}
            </Link>
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
