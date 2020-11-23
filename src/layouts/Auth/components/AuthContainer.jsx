import React from 'react';
import {
  Form, Row, Col,
} from 'antd';
import Logo from '../../../components/Logo';
import styles from './Form.module.scss';
import PitZone from '../../../components/PitZone/PitZone';

const AuthContainer = ({ onSubmit, children }) => (
  <Col
    lg={{ span: 6, offset: 9 }}
    md={{ span: 10, offset: 7 }}
    sm={{ span: 12, offset: 6 }}
    xs={{ span: 22, offset: 1 }}
  >
    <Logo />
    <Form
      className={styles.form}
      size="large"
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row>
        <PitZone />
      </Row>

      {children}

    </Form>
  </Col>
);

export default AuthContainer;
