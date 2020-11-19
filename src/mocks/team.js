import faker from 'faker/locale/en';
import { TEAM_QUERY } from '../layouts/Dashboard/containers/Teams/Team/Team';

const generateCoaches = (length) => [...new Array(length)].map((item, index) => (
  {
    id: index,
    name: faker.commerce.productName(),
    email: faker.internet.email(),
    level: faker.random.number(20),
    phone: faker.phone.phoneNumberFormat(),
    hours: faker.random.number(24),
  }
));

const generateRiders = (length) => [...new Array(length)].map((item, index) => (
  {
    id: index,
    name: faker.name.findName(),
    racePlate: faker.random.number(1000),
    grade: faker.random.number(100),
    category: faker.random.word(),
    practiceReady: 'Yes',
    events: 'events',
    state: '+',
    hours: faker.random.float(50),
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
        coaches: generateCoaches(5),
        riders: generateRiders(15),
      },
    },
  },
};

export default [pageTeamMock];
