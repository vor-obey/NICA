import faker from 'faker/locale/en';
import { COACH_QUERY } from '../layouts/Dashboard/containers/Coaches/Coaches';
import { USER_ROLE } from '../configs/mock';

const generateCoaches = (length) => [...new Array(length)].map((item, index) => (
  {
    id: index,
    league: faker.commerce.productName(),
    image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
    name: faker.name.findName(),
    email: faker.internet.email(),
    level: faker.random.number(20),
    phone: faker.phone.phoneNumberFormat(),
    hours: faker.random.number(24),
  }
));

const pageTeamMock = {
  request: {
    query: COACH_QUERY,
    variables: {
      teamId: 1,
    },
  },
  result: {
    data: {
      coaches: {
        coach: generateCoaches(20),
        role: USER_ROLE,
      },
    },
  },
};

export default [pageTeamMock];
