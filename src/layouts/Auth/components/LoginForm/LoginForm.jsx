import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Button, Container, Form, Row,
} from 'reactstrap';

import LabeledInput from '../../../../components/LabeledInput';

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
  email: 'test@gmail.com',
  password: 'Test1234',
};

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={loginValidationSchema}
  >
    {
      (formik) => (
        <Form className="form" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Container>
            <Row>
              <LabeledInput
                name="email"
                label="Email address"
                placeholder="e"
              />
            </Row>
            <Row>
              <LabeledInput
                name="password"
                type="password"
                label="Password"
                placeholder="your password"
              />
            </Row>
            <Row>
              <Button disabled={!formik.isValid} color="primary" type="submit">Sign In</Button>
            </Row>
          </Container>
        </Form>
      )
    }
  </Formik>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
