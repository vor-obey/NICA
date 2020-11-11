import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Redirect,
} from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

export const SIGN_UP_USER = gql`
    mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!){
        user(firstName: $firstName, lastName: $lastname, email: $email, password: $password){
            id
            firstName
            lastName
            email
            role
        }
    }`;

const SignUp = () => {
  const [signUp, { data }] = useMutation(SIGN_UP_USER);

  const onSubmitSignUpHandle = useCallback(
    (values) => signUp({ variables: values }),
    [signUp],
  );

  if (data?.user) {
    return <Redirect to="/" />;
  }

  return (
    <SignUpForm onSubmit={onSubmitSignUpHandle} />
  );
};
export default SignUp;
