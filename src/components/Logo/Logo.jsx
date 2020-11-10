import React from 'react';
import LogoIcon from './NICA_lockup.svg';
import styles from './Logo.module.scss';

const Logo = (props) => (
  <img src={LogoIcon} alt="NICA" {...props} className={styles.logo} />
);

export default Logo;
