import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';
import seasonMocks from './season';
import coachMock from './coach';

const delay = 3000;

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
  ...seasonMocks,
  ...coachMock,
].map(
  (m) => ({ delay, ...m }),
);

export default mocks;
