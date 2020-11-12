import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import styles from './Auth.module.scss';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import ForgotPass from './containers/ForgotPass';

const Auth = () => (
  <Row justify="center" className={styles.row}>
    <Col>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotpass" component={ForgotPass} />
      </Switch>
    </Col>
  </Row>

);

export default Auth;
