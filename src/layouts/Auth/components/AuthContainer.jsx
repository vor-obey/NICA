import React from 'react';
import {
  Form, Row,
} from 'antd';
import Logo from '../../../components/NicaLogo';
import styles from './Form.module.scss';
import PitZone from '../../../components/PitZone/PitZone';

const AuthContainer = ({ onSubmit, children }) => (
  <div>
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
  </div>
);

export default AuthContainer;
