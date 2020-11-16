import _ from 'lodash';
import { LOGIN_USER } from '../layouts/Auth/containers/Login';
import { SIGN_UP_USER } from '../layouts/Auth/containers/SignUp';

export const testUser = {
  firstName: 'Name',
  lastName: 'Surname',
  email: 'test@gmail.com',
  password: 'Test1234',
  confirmPassword: 'Test1234',
};

const authMocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: _.pick(testUser, ['email', 'password']),
    },
    result: {
      data: {
        user: {
          id: 1,
          role: 'admin',
          ...testUser,
        },
        token: 'access token',
      },
    },
  },
  {
    request: {
      query: SIGN_UP_USER,
      variables: testUser,
    },
    result: {
      data: {
        user: {
          id: 1,
          role: 'admin',
          ...testUser,
        },
      },
      token: 'access token',
    },
  },
];

export default authMocks;
