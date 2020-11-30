import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';
import coachMock from './coach';
import { DELAY } from '../configs/mock';
import teamMock from './team';
import licensesMocks from './licenses';

const mocks = [
  ...licensesMocks,
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
  ...coachMock,
  ...teamMock,
].map((mock) => ({
  delay: DELAY,
  ...mock,
}));

export default mocks;
