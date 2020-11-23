import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Descriptions, Skeleton, Typography, Space,
} from 'antd';
import GeneralInfoForm from './forms/GeneralInfoForm';
import ContactsInfoForm from './forms/ContactsInfoForm';
import MadMiniInfoForm from './forms/MadMiniInfoForm';
import TeenTrailCorpsForm from './forms/TeenTrailCorpsForm';

const { Panel } = Collapse;
const { Title, Text } = Typography;

const SeasonInfoEdit = ({ loading, season }) => {
  const {
    name, startedAt, league, divisionsCount,
    contactsInfoReleases,
    riderNewsletterId,
    coachNewsletterId,
    allowCoachesReportTTCHours,
  } = season;
  return (
    <Collapse>
      <Panel key={1} header={<Title level={3}>General information</Title>}>
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
              <GeneralInfoForm onSubmit={console.log} initialValues={{ startDate: startedAt }} />
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
      <Panel key={2} header={<Title level={3}>Release of Contacts Information</Title>}>
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 4 }}
        >
          <Descriptions
            bordered
          >
            <Descriptions.Item label="release of contact info">
              <ContactsInfoForm onSubmit={console.log} initialValues={{ contactsInfoReleases }} />
            </Descriptions.Item>
          </Descriptions>
        </Skeleton>
      </Panel>
      <Panel key={3} header={<Title level={3}>Mad mini information</Title>}>
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 4 }}
        >
          <Space direction="vertical" size="large">
            <Text>
              The ID of a Mad Mini list can be localed by logging in to
              {' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://madmini.com/"
              >
                https://madmini.com/
              </a>
              , location the desired audience list and examining the URL.
            </Text>
            <Text
              block
            >
              {'For example, given the URL "https://madmini.com/audience_list/123", the list\'s ID is "123"'}
            </Text>
            <MadMiniInfoForm
              onSubmit={console.log}
              initialValues={{
                riderNewsletterId,
                coachNewsletterId,
              }}
            />
          </Space>
        </Skeleton>
      </Panel>
      <Panel key={4} header={<Title level={3}>Teen trail corps</Title>}>
        <Skeleton
          active
          loading={loading}
          paragraph={{ rows: 4 }}
        >
          <TeenTrailCorpsForm
            onSubmit={console.log}
            initialValues={{
              allowCoachesReportTTCHours,
            }}
          />
        </Skeleton>
      </Panel>
    </Collapse>
  );
};

SeasonInfoEdit.propTypes = {
  loading: PropTypes.bool.isRequired,
  season: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    league: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.shape({
        formal: PropTypes.string.isRequired,
        short: PropTypes.string.isRequired,
      }).isRequired,
      image: PropTypes.string,
    }).isRequired,
    divisionsCount: PropTypes.number.isRequired,
    contactsInfoReleases: PropTypes.arrayOf(PropTypes.string).isRequired,
    riderNewsletterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    coachNewsletterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    allowCoachesReportTTCHours: PropTypes.bool.isRequired,
  }),
};

SeasonInfoEdit.defaultProps = {
  season: {},
};

export default SeasonInfoEdit;
