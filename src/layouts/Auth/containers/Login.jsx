import _ from 'lodash';
import React, { useCallback } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import LoginForm from '../components/LoginForm';

export const LOGIN_USER = gql`
    query login($email: String!, $password: String!){
        user(email: $email, password: $password){
            id
            firstName
            lastName
            email
            role
        }
    }
`;
const Login = () => {
  const [login, { data }] = useLazyQuery(LOGIN_USER);

  const onSubmitLoginHandle = useCallback((values) => {
    login({
      variables: _.pick(values, ['email', 'password']),
    });
  }, [login]);

  if (data?.user) {
    return <Redirect from="/login" to="/" />;
  }

  return (
    <LoginForm onSubmit={onSubmitLoginHandle} />
  );
};

export default Login;
