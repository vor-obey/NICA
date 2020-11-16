import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
];

export default mocks;
