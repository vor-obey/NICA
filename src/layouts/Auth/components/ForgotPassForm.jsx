import React from 'react';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import AuthContainer from './AuthContainer';
import styles from './Form.module.scss';

const emailRules = [
  {
    required: true,
    message: 'Please input your e-mail address!',
  },
];

const ForgotPassForm = () => (
  <AuthContainer>
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
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className={styles.submitButton}
      >
        Send Email
      </Button>
    </Form.Item>
  </AuthContainer>
);

export default ForgotPassForm;
