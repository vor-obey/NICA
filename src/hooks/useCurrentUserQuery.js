import { gql } from '@apollo/client';
import useAuthQuery from './useAuthQuery';

export const CURRENT_USER_QUERY = gql`
    query currentUser($userId: ID!){
        user(id: $userId){
            id
            firstName
            lastName
            images
            email
            role
            memberships
        }
    }`;

const useCurrentUserQuery = () => useAuthQuery(CURRENT_USER_QUERY, {
  variables: {
    userId: 1,
  },
});

export default useCurrentUserQuery;
