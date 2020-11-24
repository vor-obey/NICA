import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';
import seasonMocks from './season';
import teamMocks from './team';
import coachMock from './coach';

const delay = 3000;

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
  ...seasonMocks,
  ...teamMocks,
  ...coachMock,
].map(
  (m) => ({ delay, ...m }),
);

export default mocks;
