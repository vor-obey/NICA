import * as yup from 'yup';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  Formik,
} from 'formik';
import {
  Container, Row, Form, Button,
} from 'reactstrap';
import LabeledInput from '../../../../components/LabeledInput';

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
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
});

export const initialValues = {
  firstName: 'Name',
  lastName: 'Surname',
  email: 'test@gmail.com',
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
        (formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <Container>
              <Row>
                <LabeledInput
                  label="First name"
                  name="firstName"
                  placeholder="name"
                />
              </Row>
              <Row>
                <LabeledInput
                  label="Lastname name"
                  name="lastName"
                  placeholder="surname"
                />

              </Row>
              <Row>
                <LabeledInput
                  label="Email address"
                  name="email"
                  placeholder="example@mail.com"
                />

              </Row>
              <Row>
                <LabeledInput
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="password"
                />
              </Row>
              <Row>
                <LabeledInput
                  type="password"
                  label="Confirm password"
                  name="confirmPassword"
                  placeholder="repeat password"
                />

              </Row>
              <Row>
                <Button
                  color="primary"
                  disabled={!formik.isValid}
                  type="submit"
                >
                  Sign up
                </Button>
              </Row>
            </Container>
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
