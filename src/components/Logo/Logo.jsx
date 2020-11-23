import React from 'react';
import LogoIcon from './noimage2.png';
import styles from './Logo.module.scss';

const Logo = (props) => (
  <img src={LogoIcon} alt="NICA" className={styles.logo} {...props} />
);

export default Logo;
