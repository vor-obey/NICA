import faker from 'faker/locale/en';
import { TEAM_QUERY } from '../layouts/Dashboard/containers/Coaches/Coaches';

const generateCoaches = (length) => [...new Array(length)].map((item, index) => (
  {
    id: index,
    name: faker.name.findName(),
    email: faker.internet.email(),
    level: faker.random.number(20),
    phone: faker.phone.phoneNumberFormat(),
    hours: faker.random.number(24),
  }
));

const pageTeamMock = {
  request: {
    query: TEAM_QUERY,
    variables: {
      teamId: 1,
    },
  },
  result: {
    data: {
      team: {
        coaches: generateCoaches(20),
      },
    },
  },
};

export default [pageTeamMock];
