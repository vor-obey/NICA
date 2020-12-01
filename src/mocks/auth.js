import _ from 'lodash';
import faker from 'faker';
import { CURRENT_USER_QUERY } from '../hooks/useCurrentUser';
import { LOGIN_USER } from '../layouts/Auth/containers/Login';
import { SIGN_UP_USER } from '../layouts/Auth/containers/SignUp';

export const testUser = {
  firstName: 'Name',
  lastName: 'Surname',
  email: 'test@gmail.com',
  password: 'Test1234',
  confirmPassword: 'Test1234',
};

const loginMock = {
  request: {
    query: LOGIN_USER,
    variables: _.pick(testUser, ['email', 'password']),
  },
  result: () => ({
    data: {
      user: {
        id: 1,
        role: localStorage.getItem('role'),
        ...testUser,
      },
      token: 'access token',
    },
  }),
};
const signUpMock = {
  request: {
    query: SIGN_UP_USER,
    variables: testUser,
  },
  result: () => ({
    data: {
      user: {
        id: 1,
        role: localStorage.getItem('role'),
        ...testUser,
      },
    },
    token: 'access token',
  }),
};
const currentUserMock = {
  request: {
    query: CURRENT_USER_QUERY,
    variables: {
      userId: 1,
    },
  },
  result: () => ({
    data: {
      user: {
        id: 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        image: faker.image.people(),
        email: faker.internet.email(),
        role: localStorage.getItem('role'),
        __typename: 'User',
      },
    },
  }),
  delay: 10,
};

const authMocks = [loginMock, signUpMock, currentUserMock];

export default authMocks;
