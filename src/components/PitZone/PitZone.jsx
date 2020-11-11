import React from 'react';
import TentIcon from './icon_red_white_tent.svg';
import styles from './PitZone.module.scss';

const PitZone = () => (

  <div className={styles.container}>
    <img className={styles.icon} src={TentIcon} alt="Pit Zone" />
    <h2 className={styles.title}>pit zone</h2>
  </div>

);

export default PitZone;
