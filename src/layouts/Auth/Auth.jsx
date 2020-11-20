import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import styles from './Auth.module.scss';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import ForgotPass from './containers/ForgotPass';
import AuthContainer from './components/AuthContainer';

const Auth = () => (
  <Row justify="center" className={styles.row}>
    <Col>
      <AuthContainer>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotpass" component={ForgotPass} />
        </Switch>
      </AuthContainer>
    </Col>
  </Row>
);

export default Auth;
