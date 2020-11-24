import React from 'react';
import {
  Collapse, Descriptions, Skeleton, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import styles from './SeasonInfo.module.scss';

const { Panel } = Collapse;
const { Title } = Typography;

const SeasonInfo = ({ loading, season }) => {
  const {
    name, startedAt, league, divisionsCount,
    contactInfoReleases,
    riderNewsletterId,
    coachNewsletterId,
    allowCoachesReportTTCHours,
  } = season;

  return (
    <Collapse>
      <Panel
        key={1}
        header={
          <Title level={3} data-margin-fix className={styles.panelTitle}>General information</Title>
        }
      >
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 4 }}
        >
          <Descriptions
            bordered
            column={1}
            layout="horizontal"
          >
            <Descriptions.Item label="Season">
              {name}
            </Descriptions.Item>
            <Descriptions.Item label="Start date">
              {
                startedAt
              }
            </Descriptions.Item>
            <Descriptions.Item label="League">
              {league?.name?.short}
            </Descriptions.Item>
            <Descriptions.Item label="Number of Divisions">
              {divisionsCount}
            </Descriptions.Item>
          </Descriptions>
        </Skeleton>
      </Panel>
      <Panel
        key={2}
        header={(
          <Title level={3} data-margin-fix className={styles.panelTitle}>
            Release of Contacts
            Information
          </Title>
        )}
      >
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 4 }}
        >
          <Descriptions
            bordered
          >
            <Descriptions.Item label="release of contact info">
              {
                contactInfoReleases
              }
            </Descriptions.Item>
          </Descriptions>
        </Skeleton>
      </Panel>
      <Panel
        key={3}
        header={(
          <Title level={3} data-margin-fix className={styles.panelTitle}>
            Mad mini
            information
          </Title>
        )}
      >
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 4 }}
        >
          <Descriptions bordered>
            <Descriptions.Item label="Rider newsletter ID">
              {riderNewsletterId}
            </Descriptions.Item>
            <Descriptions.Item label="Coach newsletter ID">
              {coachNewsletterId}
            </Descriptions.Item>
          </Descriptions>
        </Skeleton>
      </Panel>
      <Panel
        key={4}
        header={(
          <Title level={3} data-margin-fix className={styles.panelTitle}>
            Teen trail
            corps
          </Title>
        )}
      >
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 4 }}
        >
          <Descriptions bordered>
            <Descriptions.Item label="Allow coaches to report TTC Hours?">
              {allowCoachesReportTTCHours ? 'Yes' : 'No'}
            </Descriptions.Item>
          </Descriptions>
        </Skeleton>
      </Panel>
    </Collapse>
  );
};

SeasonInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  season: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    league: PropTypes.string.isRequired,
    divisionsCount: PropTypes.string.isRequired,
    contactInfoReleases: PropTypes.string.isRequired,
    riderNewsletterId: PropTypes.string.isRequired,
    coachNewsletterId: PropTypes.string.isRequired,
    allowCoachesReportTTCHours: PropTypes.string.isRequired,
  }),
};

SeasonInfo.defaultProps = {
  season: {},
};

export default SeasonInfo;
