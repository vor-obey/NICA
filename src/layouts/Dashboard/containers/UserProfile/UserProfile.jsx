import React from 'react';
import {
  Row, Card, Skeleton,
} from 'antd';
import { gql } from '@apollo/client';
import PageTitle from '../../components/PageTitle';
import PersonalInformation from './PersonalInformation';
import { permissions } from '../../../../configs/app';

import styles from './UserProfile.module.scss';
import useAuthQuery from '../../../../hooks/useAuthQuery';

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
  const { data, loading } = useAuthQuery(USER_QUERY, {
    variables: {
      coachId: 1,
    },
  });

  const roleTitle = `${data?.coach?.name?.firstName} ${data?.coach?.name?.lastName}`;
  const role = data?.coach?.role;

  const renderTitle = {
    [permissions.roles.COACH]: `Coach: ${roleTitle}`,
    [permissions.roles.LEAGUE_ADMIN]: `Admin: ${roleTitle}`,
    [permissions.roles.SUPER_ADMIN]: `Super Admin: ${roleTitle}`,
  };

  return (
    <>
      <Row className={styles.logoHeader}>
        <PageTitle
          loading={loading}
          title={renderTitle[role] || ''}
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
