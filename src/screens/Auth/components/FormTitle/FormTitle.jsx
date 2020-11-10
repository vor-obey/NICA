import React from 'react';
import TentIcon from './icon_red_white_tent.svg';
import styles from './FormTitle.module.scss';

const FormTitle = () => (

  <div className={styles.container}>
    <img className={styles.icon} src={TentIcon} alt="Pit Zone" />
    <h2 className={styles.title}>pit zone</h2>
  </div>

);

export default FormTitle;
