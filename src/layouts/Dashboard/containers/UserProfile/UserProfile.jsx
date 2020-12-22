import React, { useEffect } from 'react';
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
    query dashboardCoach($userId: ID!){
        user (id: $userId){
            id
            firstName
            lastName
            email
            birthDate
            cellPhone
            homePhone
            workPhone
            timeZone
            address
            role
            memberships
        },
    }`;

const UserProfile = () => {
  const { data, loading } = useAuthQuery(USER_QUERY, {
    variables: {
      userId: 1,
    },
  });

  const roleTitle = `${data?.user?.firstName} ${data?.user?.lastName}`;
  const role = data?.user?.role;

  useEffect(() => {
    console.log(role);
  }, [data]);

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
          avatar={data?.user?.memberships?.organizations[0]?.leagues[0]?.image}
        />
      </Row>

      <Skeleton loading={loading} active>
        <Card bordered={false}>
          <PersonalInformation data={data?.user} loading={loading} />
        </Card>
      </Skeleton>
    </>
  );
};

export default UserProfile;
