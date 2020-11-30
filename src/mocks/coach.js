import faker from 'faker/locale/en';
import { DASHBOARD_COACH_QUERY } from '../layouts/Dashboard/containers/Coach/Coach';
import { COACH_LICENSE_QUERY } from '../layouts/Dashboard/containers/LicenseStatus/LicenseStatus';
import { USER_ROLE } from '../configs/mock';

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
    licenseRequirement: faker.commerce.productName(),
    currentStatus: faker.finance.transactionType(),
    licenseLevel1: Math.random() > 0.5,
    licenseLevel2: Math.random() > 0.5,
    licenseLevel3: Math.random() > 0.5,
    __typename: 'License',
  }
));

const generateProducts = (length) => [...new Array(length)].map((item, index) => ({
  id: index,
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  rider: {
    id: index,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
}));

const generateOrders = (length = 4) => [...new Array(length)].map(() => ({
  total: faker.random.number(1000),
  id: faker.random.uuid(),
  date: faker.date.past()
    .toISOString(),
  status: 'paid',
  products: generateProducts(10),
}));

const generateAddress = () => ({
  city: faker.address.city(),
  timeZone: faker.address.timeZone(),
});

const coachMock = {
  request: {
    query: DASHBOARD_COACH_QUERY,
    variables: {
      coachId: 1,
    },
  },
  result: {
    data: {
      coach: {
        id: faker.random.number(100),
        name: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
        email: faker.internet.email(),
        gender: faker.name.gender(),
        birthday: faker.date.recent().toISOString(),
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
        profile: {
          id: 1,
          firstName: faker.name.firstName(0),
          lastName: faker.name.lastName(0),
          email: faker.internet.email(),
          address: generateAddress(),
          orders: generateOrders(),
        },
        league,
        role: USER_ROLE,
      },
    },
  },
};

const licenseMock = {
  request: {
    query: COACH_LICENSE_QUERY,
    variables: {
      coachId: 1,
    },
  },
  result: {
    data: {
      license: generateCoachesLicense(20),
    },
  },
};

export default [coachMock, licenseMock];
