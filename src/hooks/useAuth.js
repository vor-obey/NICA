import { gql, useQuery } from '@apollo/client';

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

function useAuth() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data;
}

export default useAuth;
