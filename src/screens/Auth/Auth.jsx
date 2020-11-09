import { useDispatch } from 'react-redux';
import React, { useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import LoginForm from './components/forms/LoginForm';
import SignUpForm from './components/forms/SignUpForm';
import * as authActionCreators from '../../actions/authActionCreators';

const Auth = () => {
  const dispatch = useDispatch();

  const {
    loginRequest,
    signUpRequest,
  } = useMemo(() => bindActionCreators(authActionCreators, dispatch),
    [authActionCreators, dispatch]);

  return (
    <Switch>
      <Route path="/login">
        <LoginForm onSubmit={loginRequest} />
      </Route>
      <Route path="/signup">
        <SignUpForm onSubmit={signUpRequest} />
      </Route>
    </Switch>
  );
};

export default Auth;
