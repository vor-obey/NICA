import authMocks from './auth';
import coachMock from './coach';
import { DELAY } from '../configs/mock';
import dashboardMocks from './dashboard';

const mocks = [
  ...authMocks,
  ...dashboardMocks,
  ...coachMock,
].map((mock) => ({
  delay: DELAY,
  ...mock,
}));

export default mocks;
