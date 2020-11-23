import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';
import teamMocks from './team';
import coachMock from './coach';

const mocksCommon = {
  delay: 1000,
};

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
  ...teamMocks,
  ...coachMock,
].map(
  (m) => ({ ...mocksCommon, ...m }),
);

export default mocks;
