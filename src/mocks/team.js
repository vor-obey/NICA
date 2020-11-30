import faker from 'faker/locale/en';
import { COACH_QUERY } from '../layouts/Dashboard/containers/Coaches/Coaches';

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
  result: () => ({
    data: {
      coaches: {
        coach: generateCoaches(20),
        role: localStorage.getItem('role'),
      },
    },
  }),
};

export default [pageTeamMock];
