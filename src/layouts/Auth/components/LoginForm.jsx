import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, Checkbox, Row,
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Form.module.scss';
import AuthContainer from './AuthContainer';

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

const LoginForm = ({ onSubmit }) => (
  <>
    <AuthContainer onSubmit={onSubmit}>
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
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          Sign in
        </Button>
      </Form.Item>
    </AuthContainer>
    <Row justify="center" className={styles.linkForgotPass}>
      <a className="login-form-forgot" href="/forgotpass">
        Forgot password?
      </a>
    </Row>
  </>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
