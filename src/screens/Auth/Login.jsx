import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from './components/LoginForm';
import { loginRequest } from '../../actions/authActionCreators';
import styles from './Auth.module.scss';
import Logo from '../../components/Logo';

const Login = () => {
  const dispatch = useDispatch();

  const handleLoginFormSubmit = useCallback((values) => {
    dispatch(loginRequest(values));
  }, [dispatch, loginRequest]);

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Logo />
      </header>
      <LoginForm onSubmit={handleLoginFormSubmit} />
    </article>

  );
};

export default Login;
