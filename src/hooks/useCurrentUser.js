import { gql, useQuery } from '@apollo/client';

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

const useCurrentUser = () => useQuery(CURRENT_USER_QUERY, {
  variables: {
    userId: '1',
  },
});

export default useCurrentUser;
