import React from 'react';

import { gql, useQuery } from '@apollo/client';
import Admins from '../../Admins';
import LeagueTitle from '../../LeagueTitle';
import Coaches from '../../Coaches';
import { permissions } from '../../../../../configs/app';

export const CURRENT_USER_QUERY = gql`
    query currentUser($userId: ID!){
        user(id: $userId){
            id
            firstName
            lastName
            image
            email
            role
        }
    }`;

const League = () => {
  const { data } = useQuery(CURRENT_USER_QUERY, {
    variables: {
      userId: 1,
    },
  });

  return (
    <>
      <LeagueTitle />

      {data?.user?.role === permissions.roles.LEAGUE_ADMIN ? '' : <Coaches />}

      <Admins />
    </>
  );
};

export default League;
