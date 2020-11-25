import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
    query currentUser{
        user{
            id
            firstName
            lastName
            avatar
            email
            role
        }
    }`;

const useCurrentUserQuery = () => useQuery(CURRENT_USER_QUERY);

export default useCurrentUserQuery;
