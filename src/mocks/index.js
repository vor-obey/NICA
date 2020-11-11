import _ from 'lodash';
import { LOGIN_USER } from '../layouts/Auth/views/Login';
import { SIGN_UP_USER } from '../layouts/Auth/views/SignUp';

export const testUser = {
  firstName: 'Name',
  lastName: 'Surname',
  email: 'test@gmail.com',
  password: 'Test1234',
  confirmPassword: 'Test1234',
  role: 'admin',
};

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: _.pick(testUser, ['email', 'password']),
    },
    result: {
      data: {
        user: {
          id: 1,
          ...testUser,
        },
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
          ...testUser,
        },
      },
    },
  },
];

export default mocks;
