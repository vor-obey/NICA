import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Form.module.scss';
import AuthContainer from './AuthContainer';

const nameRules = [
  {
    required: true,
    message: 'Please input name!',
  },
  {
    min: 5,
    message: 'Your name must be at least 5 characters.',
  },
];

const emailRules = [
  {
    required: true,
    message: 'Please input your e-mail address!',
  },
];

const passwordRules = [
  {
    required: true,
    message: 'Please input your password!',
  },
  {
    min: 8,
    message: 'Your password must be at least 8 characters.',
  },
];

const confirmPassRules = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('The two passwords that you entered do not match!');
    },
  }),
];

const SignUpForm = ({ onSubmit }) => (
  <>
    <AuthContainer onSubmit={onSubmit}>
      <Form.Item
        name="firstName"
        type="text"
        rules={nameRules}
      >
        <Input
          prefix={
            <UserOutlined className={styles.formInputIcon} />
          }
          placeholder="name"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        type="text"
        rules={nameRules}
      >
        <Input
          placeholder="surname"
          prefix={
            <UserOutlined className={styles.formInputIcon} />
          }
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={emailRules}
      >
        <Input
          placeholder="example@mail.com"
          prefix={
            <MailOutlined className={styles.formInputIcon} />
            }
        />
      </Form.Item>
      <Form.Item
        type="password"
        name="password"
        rules={passwordRules}
      >
        <Input.Password
          placeholder="password"
          prefix={
            <LockOutlined className={styles.formInputIcon} />
          }
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={confirmPassRules}
      >
        <Input.Password
          placeholder="password"
          prefix={
            <LockOutlined className={styles.formInputIcon} />
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          Sign Up
        </Button>
      </Form.Item>
    </AuthContainer>
  </>
);

export default SignUpForm;
