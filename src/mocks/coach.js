import faker from 'faker/locale/en';
import { COACH_LICENSE_QUERY } from '../layouts/Dashboard/containers/CoachLicense/CoachLicense';
import { USER_QUERY } from '../layouts/Dashboard/containers/UserProfile/UserProfile';
import { getUser } from './common';

const generateCoachesLicense = (length) => [...new Array(length)].map((item, index) => (
  {
    id: index,
    name: faker.commerce.productName(),
    step: faker.random.number({
      min: 1,
      max: 4,
    }),
    level: index,
    progress: faker.random.number(80),
    completed: false,
    access: false,
    image: 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
    __typename: 'License',
  }
));

const coachMock = {
  request: {
    query: USER_QUERY,
    variables: {
      userId: 1,
    },
  },
  newData: () => ({
    data: {
      user: getUser(),
    },
  }),
};

const licenseMock = {
  request: {
    query: COACH_LICENSE_QUERY,
    variables: {
      coachId: 1,
    },
  },
  result: () => ({
    data: {
      license: generateCoachesLicense(3),
    },
  }),
};

export default [coachMock, licenseMock];
