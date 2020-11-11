import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, Checkbox, Typography,
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Form.module.scss';

const { Title } = Typography;

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
  <Form
    className={styles.form}
    size="large"
    layout="vertical"
    onFinish={onSubmit}
  >
    <Title level={1}>Sign in</Title>
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
      <Input
        placeholder="password"
        prefix={
          <LockOutlined className={styles.formInputIcon} />
        }
      />
    </Form.Item>
    <Form.Item name="remember">
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
  </Form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
