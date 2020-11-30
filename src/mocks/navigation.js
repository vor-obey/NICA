import { USER_ROLE } from '../configs/mock';
import { DASHBOARD_NAVBAR_QUERY } from '../hooks/useNavItems/useNavItems';

const dashboardNavBarMock = {
  request: {
    query: DASHBOARD_NAVBAR_QUERY,
    variables: null,
  },
  result: () => ({
    data: {
      user: {
        id: 1,
        role: USER_ROLE,
        myLeague: {
          id: 1,
        },
        myLicense: {
          id: 1,
        },
      },
    },
  }),
};

export default [dashboardNavBarMock];
