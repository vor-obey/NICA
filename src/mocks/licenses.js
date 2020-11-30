import faker from 'faker';
import { LICENSES_QUERY } from '../layouts/Dashboard/containers/Licenses/Licenses';

const statuses = ['signed', 'paid', 'passed'];
const generateLeagues = (length) => [...new Array(length)].map((item, index) => ({
  id: `_${index + 1}_`,
  name: `League #${index + 1}`,
  __typename: 'League',
}));
const leagues = generateLeagues(10);

const generateLicenses = (length) => [...new Array(length)].map((item, index) => ({
  id: `_${index + 1}_`,
  level: faker.random.number({
    min: 1,
    max: 3,
  }),
  status: statuses[faker.random.number({
    min: 0,
    max: statuses.length - 1,
  })],
  league: leagues[faker.random.number({
    min: 0,
    max: leagues.length - 1,
  })],
  coach: {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    __typename: 'User',
  },
  __typename: 'License',
}));

const createData = () => ({
  licenses: generateLicenses(100),
  leagues,
});

const adminLicensesMock = {
  request: {
    query: LICENSES_QUERY,
  },
  result: {
    data: createData(),
  },
};

export default [adminLicensesMock];
