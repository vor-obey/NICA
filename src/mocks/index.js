import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';
import seasonMocks from './season';
import teamMocks from './team';

const delay = 2000;

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
  ...seasonMocks,
  ...teamMocks,
].map(
  (m) => ({ delay, ...m }),
);

export default mocks;
