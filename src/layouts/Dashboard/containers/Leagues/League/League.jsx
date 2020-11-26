import React from 'react';
import {
  Row, Popover,
} from 'antd';
import {
  DownloadOutlined,
} from '@ant-design/icons';
import styles from './League.module.scss';
import Admins from '../../Admins';
import LeagueTitle from '../../LeagueTitle';
import Coaches from '../../Coaches';

const League = () => {
  const renderButtonCoach = () => (
    <Row>
      <Popover
        placement="left"
        content={(
          <div className={styles.popoverLinks}>
            <a target="_blank" rel="noopener noreferrer" href="/#">Export Coaches CSV</a>
            <a target="_blank" rel="noopener noreferrer" href="/#">Emergency Contacts CSV</a>
          </div>
)}
        trigger="click"
      >
        <DownloadOutlined className={styles.buttonIcons} />
      </Popover>
    </Row>
  );

  return (
    <>
      <LeagueTitle />

      <Coaches buttons={renderButtonCoach || ''} />

      <Admins />
    </>
  );
};

export default League;
