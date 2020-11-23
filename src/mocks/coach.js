import faker from 'faker/locale/en';
import { DASHBOARD_COACH_QUERY } from '../layouts/Dashboard/containers/Coach/Coach';
import { COACH_LICENSE_QUERY } from '../layouts/Dashboard/containers/Coach/LicenseStatus/LicenseStatus';

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
