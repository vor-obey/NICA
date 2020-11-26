import faker from 'faker/locale/en';
import { USER_ROLE } from '../configs/mock';
import { DASHBOARD_USER_QUERY } from '../layouts/Dashboard/Dashboard';
import { DASHBOARD_NAVBAR_QUERY } from '../hooks/useNavItems/useNavItems';

const dashboardMock = {
  request: {
    query: DASHBOARD_USER_QUERY,
    variables: { userId: '1' },
  },
  result: () => ({
    data: {
      user: {
        id: '1',
        firstName: faker.name.firstName(0),
        lastName: faker.name.lastName(0),
        image: faker.image.avatar(),
        role: USER_ROLE,
      },
    },
  }),
};
const dashboardNavMock = {
  request: {
    query: DASHBOARD_NAVBAR_QUERY,
  },
  result: () => ({
    data: {
      user: {
        id: '1',
        role: USER_ROLE,
        myLeague: {
          id: '1',
        },
        myLicence: {
          id: '1',
        },
      },
    },
  }),
  delay: 1,
};

export default [dashboardMock, dashboardNavMock];
