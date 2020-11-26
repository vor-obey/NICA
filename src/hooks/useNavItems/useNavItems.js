import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';

import navItems from './navItems';

export const DASHBOARD_NAVBAR_QUERY = gql`
    query navParams{
        user{
            id
            role
            myLeague{
                id
            }
            myLicence{
                id
            }
        }
    }`;

const filterByRole = (role) => ({ roles }) => (!Array.isArray(roles) || roles.includes(role));

const mapParams = (params) => (item) => {
  const { to } = item;
  if (typeof to === 'function') {
    return {
      ...item,
      to: to(params),
    };
  }
  return item;
};

const useNavItems = () => {
  const { data } = useQuery(DASHBOARD_NAVBAR_QUERY);
  return useMemo(() => {
    if (data) {
      const { user: { role, myLeague, myLicence } } = data;
      return navItems
        .filter(filterByRole(role))
        .map(mapParams({
          leagueId: myLeague?.id,
          licenceId: myLicence?.id,
        }));
    }
    return [];
  }, [data]);
};

export default useNavItems;
