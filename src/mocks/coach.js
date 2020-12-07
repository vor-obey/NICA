import faker from 'faker/locale/en';
import { COACH_LICENSE_QUERY } from '../layouts/Dashboard/containers/LicenseStatus/LicenseStatus';
import { USER_QUERY } from '../layouts/Dashboard/containers/UserProfile/UserProfile';

const league = {
  id: 1,
  season: {
    id: 1,
    name: '2020',
    __typename: 'Season',
  },
  name: {
    short: 'Utah',
    formal: 'Utah Interscholastic',
  },
  image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
  __typename: 'League',
};

const generateCoachesLicense = (length) => [...new Array(length)].map((item, index) => (
  {
    id: index,
    license: faker.commerce.productName(),
    level: faker.random.number({ min: 1, max: 6 }),
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
      coachId: 1,
    },
  },
  newData: () => ({
    data: {
      coach: {
        id: faker.random.number(100),
        name: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
        email: faker.internet.email(),
        gender: faker.name.gender(),
        birthday: faker.date.recent()
          .toISOString(),
        phone: {
          cellPhone: faker.phone.phoneNumberFormat(),
          homePhone: faker.phone.phoneNumberFormat(),
          workPhone: faker.phone.phoneNumberFormat(),
        },
        address: {
          street1: faker.address.streetAddress(),
          street2: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip: faker.random.number({
            min: 10000,
            max: 90000,
          }),
          zone: faker.address.timeZone(),
        },
        __typename: 'User',
        league,
        role: localStorage.getItem('role'),
      },
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
      license: generateCoachesLicense(8),
    },
  }),
};

export default [coachMock, licenseMock];
