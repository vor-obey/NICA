import React from 'react';
import {
  Collapse, Row,
} from 'antd';
import { gql, useQuery } from '@apollo/client';
import CoachInfo from './CoachInfo/CoachInfo';
import PageTitle from '../../components/PageTitle';
import CoachLogo from './Lea.png';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import CoachAdmin from './CoachAdmin/CoachAdmin';
import TeamRoles from './TeamRoles/TeamsRoles';
import LicenseStatus from './LicenseStatus/LicenseStatus';
import HealthInformation from './HealthInformation/HealthInformation';
import EmergencyContacts from './EmergencyContacts/EmergencyContacts';
import CoachReleases from './CoachReleases/CoachReleases';
import styles from './Coach.module.scss';

const { Panel } = Collapse;

const header = [
  'Personal information',
  'Coach admin',
  'Coach information',
  'Team roles',
  'License status',
  'Emergency contacts',
  'Health information',
  'Coach releases',
  'Code of Conduct',
  'Participation agreement',
  'Background check',
];

export const DASHBOARD_COACH_QUERY = gql`
    query dashboardCoach($coachId: ID!){
        coach (id: $coachId){
            id
            name,
            email
            gender,
            birthday,
            phone,
            address
        }
    }`;

const Coach = () => {
  const { data, loading } = useQuery(DASHBOARD_COACH_QUERY, {
    variables: {
      coachId: 1,
    },
  });

  if (!loading && data) {
    const { name } = data.coach;
    return (
      <>
        <Row className={styles.logoHeader}>
          <PageTitle
            loading={loading}
            title={<div className={styles.titleHeader}>{`Coach: ${name.firstName} ${name.lastName}`}</div>}
            avatar={CoachLogo}
            description={<div className={styles.descriptionHeader}>Allatoona Creek Composite</div>}
          />
        </Row>

        <Collapse accordion className={styles.collapseM}>
          <Panel key={1} header={header[0]} className={styles.panelP}>
            <PersonalInformation data={data.coach} loading={loading} />
          </Panel>
          <Panel key={2} header={header[1]} className={styles.panelP}>
            <CoachAdmin loading={loading} />
          </Panel>
          <Panel key={3} header={header[2]} className={styles.panelP}>
            <CoachInfo loading={loading} />
          </Panel>
          <Panel key={4} header={header[3]} className={styles.panelP}>
            <TeamRoles loading={loading} />
          </Panel>
          <Panel key={5} header={header[4]} className={styles.panelP}>
            <LicenseStatus />
          </Panel>
          <Panel key={6} header={header[5]} className={styles.panelP}>
            <EmergencyContacts loading={loading} />
          </Panel>
          <Panel key={7} header={header[6]} className={styles.panelP}>
            <HealthInformation loading={loading} />
          </Panel>
          <Panel key={8} header={header[7]} className={styles.panelP}>
            <CoachReleases />
          </Panel>
          <Panel key={9} header={header[8]} className={styles.panelP}>
            The code of conduct has been agree to.
          </Panel>
          <Panel key={10} header={header[9]} className={styles.panelP}>
            Do am he horrible distance marriage so although. Afraid assure
            square so happen mr an before. His many same been well can high that.
          </Panel>
          <Panel key={11} header={header[10]} className={styles.panelP}>
            You background check has been approved
          </Panel>
        </Collapse>
      </>
    );
  }
  return null;
};

export default Coach;
