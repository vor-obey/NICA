import React from 'react';
import {
  Button, Form, Input, Row,
} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import styles from './Form.module.scss';

const emailRules = [
  {
    required: true,
    message: 'Please input your e-mail address!',
  },
];

const ForgotPassForm = () => (
  <>
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
    <Row justify="center" className={styles.linkForgotPass}>
      <a className="login-form-forgot" href="/login">
        Back to login
      </a>
    </Row>
  </>
);

export default ForgotPassForm;
