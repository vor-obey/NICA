import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';

const mocksCommon = {
  delay: 6000,
};

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
].map(
  (m) => ({ ...mocksCommon, ...m }),
);

export default mocks;
