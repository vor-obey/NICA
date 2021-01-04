import faker from 'faker';

const userData = {
  id: faker.random.number(20),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthDate: faker.date.recent()
    .toISOString(),
  cellPhone: faker.phone.phoneNumberFormat(),
  homePhone: faker.phone.phoneNumberFormat(),
  workPhone: faker.phone.phoneNumberFormat(),
  timeZone: faker.address.timeZone(),
  address: {
    line1: faker.address.streetAddress(),
    line2: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    postalCode: faker.random.number({
      min: 10000,
      max: 90000,
    }),
    countryCode: 'US',
  },
  images: {
    profile: faker.image.people(),
  },
  memberships: {
    organizations: [
      {
        id: faker.random.number(1000000),
        name: 'Organization 1 Name',
        permissions: ['a', 'b'],
        leagues: [
          {
            id: faker.random.number(1000000),
            name: 'League 1 Name',
            image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
            permissions: ['a', 'b'],
            teams: [
              {
                id: faker.random.number(1000000),
                name: 'Team 1 name',
                permissions: ['a', 'b'],
              },
              {
                id: faker.random.number(1000000),
                name: 'Team 2 name',
                permissions: ['a', 'b'],
              },
            ],
          },
          {
            id: faker.random.number(1000000),
            name: 'League 2 Name',
            image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
            permissions: ['a', 'b'],
            teams: [
              {
                id: faker.random.number(1000000),
                name: 'Team 3 name',
                permissions: ['a', 'b'],
              },
              {
                id: faker.random.number(1000000),
                name: 'Team 4 name',
                permissions: ['a', 'b'],
              },
              {
                id: faker.random.number(1000000),
                name: 'Team 5 name',
                permissions: ['a', 'b'],
              },
            ],
          },
          {
            id: faker.random.number(1000000),
            name: 'League 3 Name',
            image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
            permissions: ['a', 'b'],
            teams: [
              {
                id: faker.random.number(1000000),
                name: 'Team 6 name',
                permissions: ['a', 'b'],
              },
            ],
          },
        ],
      },
    ],
  },
  __typename: 'User',
};

// eslint-disable-next-line import/prefer-default-export
export const getUser = () => (
  {
    ...userData,
    role: localStorage.getItem('role'),
  }
);
