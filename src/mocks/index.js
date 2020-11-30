import authMocks from './auth';
import leagueMocks from './league';
import dashboardMocks from './dashboard';
import coachMock from './coach';
import { DELAY } from '../configs/mock';
import teamMock from './team';
import licenses from './licenses';

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...leagueMocks,
  ...coachMock,
  ...teamMock,
  ...licenses,
].map((mock) => ({
  delay: DELAY,
  ...mock,
}));

export default mocks;
