import { gql } from '@apollo/client';
import useAuthQuery from './useAuthQuery';

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

const useCurrentUser = () => useAuthQuery(CURRENT_USER_QUERY, {
  variables: {
    userId: 1,
  },
});

export default useCurrentUser;
