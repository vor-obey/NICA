import { useHistory } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Auth.module.scss';
import Logo from '../../components/NicaLogo';
import LoginForm from './components/LoginForm';
import { userSelector } from '../../selectors';
import { loginRequest } from '../../actions/authActionCreators';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      history.replace('/');
    }
  }, [user]);

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
