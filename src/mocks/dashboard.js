import { DASHBOARD_NAVBAR_QUERY } from '../layouts/Dashboard/components/NavBar/NavBar';

const dashboardNavMock = {
  request: {
    query: DASHBOARD_NAVBAR_QUERY,
    variables: {
      id: 1,
    },
  },
  newData: () => ({
    data: {
      user: {
        id: 1,
        role: localStorage.getItem('role'),
        myLeague: {
          id: 1,
        },
        myLicense: {
          id: 1,
        },
        __typename: 'User',
      },
    },
  }),
};

export default [dashboardNavMock];
