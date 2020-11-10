import * as yup from 'yup';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

const signUpValidationSchema = yup.object({
  firstName: yup.string()
    .trim()
    .required(),
  lastName: yup.string()
    .trim()
    .required(),
  email: yup.string()
    .trim()
    .email()
    .required(),
  password: yup.string()
    .min(8)
    .required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});

const initialValues = {
  firstName: `Name${Date.now()}`,
  lastName: `Surname${Date.now()}`,
  email: `test${Date.now()}@gmail.com`,
  password: 'Test1234',
  confirmPassword: 'Test1234',
};

const SignUpForm = (props) => {
  const { onSubmit } = props;

  const handleSubmit = useCallback(
    (values) => {
      onSubmit(values);
    }, [onSubmit],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signUpValidationSchema}
    >
      {
        () => (
          <Form>
            <Field name="firstName" />
            <ErrorMessage name="firstName" />
            <Field name="lastName" />
            <ErrorMessage name="lastName" />
            <Field name="email" />
            <ErrorMessage name="email" />
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
            <Field name="confirmPassword" type="password" />
            <ErrorMessage name="confirmPassword" />
            <button type="submit">Sign In</button>
          </Form>
        )
      }
    </Formik>
  );
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
