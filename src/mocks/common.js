import faker from 'faker';

// eslint-disable-next-line import/prefer-default-export
export const getUser = () => ({
  id: 1,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  image: faker.image.people(),
  email: faker.internet.email(),
  role: localStorage.getItem('role'),
  __typename: 'User',
});
