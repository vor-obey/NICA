import React from 'react';
import TentIcon from './noimage2.png';
import styles from './PitZone.module.scss';

const PitZone = () => (

  <div className={styles.container}>
    <img className={styles.icon} src={TentIcon} alt="Pit Zone" />
  </div>

);

export default PitZone;
