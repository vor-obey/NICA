import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field,
} from 'formik';
import styles from './LoginForm.module.scss';
import Button from '../../../../components/Button';
import LabeledInput from '../../../../components/LabeledInput';
import PitZone from '../../../../components/PitZone/PitZone';

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

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={loginValidationSchema}
  >
    {
      () => (
        <Form className={styles.form}>
          <div className={styles.innerWrapper}>
            <PitZone />
            <div className={styles.fieldWrapper}>
              <Field name="email" label="Email" as={LabeledInput} />
            </div>
            <div className={styles.fieldWrapper}>
              <Field name="password" type="password" label="Password" as={LabeledInput} />
            </div>
            <div className={styles.submitBtnWrapper}>
              <Button primary type="submit">Sign In</Button>
            </div>
          </div>
        </Form>
      )
    }
  </Formik>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
