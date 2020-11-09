import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';

const loginValidationSchema = yup.object({
  email: yup.string()
    .trim()
    .email()
    .required(),
  password: yup.string()
    .min(8)
    .required(),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = (props) => {
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
      validationSchema={loginValidationSchema}
    >
      {
        () => (
          <Form>
            <Field name="email" />
            <ErrorMessage name="email" />
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
            <button type="submit">Sign In</button>
          </Form>
        )
      }
    </Formik>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
