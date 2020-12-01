import React from 'react';
import {
  Row, Card, Skeleton,
} from 'antd';
import { gql, useQuery } from '@apollo/client';
import PageTitle from '../../components/PageTitle';
import PersonalInformation from './PersonalInformation';

import styles from './UserProfile.module.scss';

export const USER_QUERY = gql`
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

const UserProfile = () => {
  const { data, loading } = useQuery(USER_QUERY, {
    variables: {
      coachId: 1,
    },
  });

  const renderTitle = `Coach: ${data?.coach?.name?.firstName} ${data?.coach?.name?.lastName}`;

  return (
    <>
      <Row className={styles.logoHeader}>
        <PageTitle
          loading={loading}
          title={renderTitle}
          avatar={data?.coach?.league.image}
          description={`${data?.coach?.league?.name?.short ?? ''} league`}
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

export default UserProfile;
