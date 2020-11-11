import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import styles from './Auth.module.scss';
import Login from './containers/Login';

const Auth = () => (
  <Row justify="center" className={styles.row}>
    <Col>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Col>
  </Row>

);

export default Auth;
