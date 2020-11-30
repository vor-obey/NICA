import React from 'react';
import {
  Row, Card, Skeleton,
} from 'antd';
import { gql, useQuery } from '@apollo/client';
import PageTitle from '../../components/PageTitle';
import PersonalInformation from './PersonalInformation';

import styles from './Coach.module.scss';

export const DASHBOARD_COACH_QUERY = gql`
    query dashboardCoach($coachId: ID!){
        coach (id: $coachId){
            id
            name,
            email
            gender,
            birthday,
            phone,
            address
            role,
            league,
        },
    }`;

const Coach = () => {
  const { data, loading } = useQuery(DASHBOARD_COACH_QUERY, {
    variables: {
      coachId: 1,
    },
  });

  return (
    <>
      <Row className={styles.logoHeader}>
        <PageTitle
          loading={loading}
          title={(
            <div className={styles.titleHeader}>
              {`Coach: ${data?.coach?.name?.firstName} ${data?.coach?.name?.lastName}`}
            </div>
)}
          avatar={data?.coach?.league.image}
          description={(
            <div className={styles.descriptionHeader}>
              {`${data?.coach?.league?.name?.short ?? ''} league`}
            </div>
          )}
        />
      </Row>

      <Skeleton loading={loading} active>
        <Card bordered={false}>
          <PersonalInformation data={data?.coach} loading={loading} />
        </Card>
      </Skeleton>
    </>
  );
};

export default Coach;
