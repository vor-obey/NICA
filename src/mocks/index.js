import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';
import seasonMocks from './season';
import coachMock from './coach';
import { permissions } from '../config';

const delay = 3000;
const userRole = permissions.roles.SUPER_ADMIN;

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
  ...seasonMocks,
  ...coachMock,
].map(
  (m) => {
    const { result } = m;
    // eslint-disable-next-line no-param-reassign
    m.delay = delay;
    if (result?.data?.user?.role) {
      result.data.user.role = userRole;
    }
    return m;
  },
);

export default mocks;
