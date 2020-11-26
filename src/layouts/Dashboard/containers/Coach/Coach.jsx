import React from 'react';
import {
  Collapse, Row, Card, Skeleton,
} from 'antd';
import { gql, useQuery } from '@apollo/client';
import CoachInfo from './CoachInfo';
import PageTitle from '../../components/PageTitle';
import PersonalInformation from './PersonalInformation';
import TeamRoles from './TeamRoles';
import HealthInformation from './HealthInformation';
import EmergencyContacts from './EmergencyContacts';
import CoachReleases from './CoachReleases';
import CoachAdmin from './CoachAdmin';
import styles from './Coach.module.scss';
import OrderHistory from '../../components/OrderHistory/OrderHistory';

const { Panel } = Collapse;

const header = [
  'Personal information',
  'Coach admin',
  'Coach information',
  'League roles',
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
            profile {
                id,
                firstName,
                lastName,
                email,
                address {
                    city,
                    timeZone,
                },
                orders {
                    id,
                    date,
                    status,
                    total,
                    products {
                        id,
                        name,
                        price,
                        rider {
                            id,
                            firstName,
                            lastName,
                        }
                    }
                },
            },
            league,
        },
    }`;

const Coach = () => {
  const { data, loading } = useQuery(DASHBOARD_COACH_QUERY, {
    variables: {
      coachId: 1,
    },
  });
  return (
    <>
      <Row className={styles.logoHeader}>
        <PageTitle
          loading={loading}
          title={<div className={styles.titleHeader}>{`Coach: ${data?.coach?.name?.firstName} ${data?.coach?.name?.lastName}`}</div>}
          avatar={data?.coach?.league.image}
          description={(
            <div className={styles.descriptionHeader}>
              {`${data?.coach?.league?.name?.short ?? ''} league`}
            </div>
          )}
        />
      </Row>
      <Skeleton loading={loading} active>
        <Card bordered={false}>
          <PersonalInformation data={data?.coach} loading={loading} />
        </Card>
      </Skeleton>

      {/* <Panel key={2} header={header[1]} className={styles.panelP}> */}
      {/*  <CoachAdmin loading={loading} /> */}
      {/* </Panel> */}
      {/* <Panel key={3} header={header[2]} className={styles.panelP}> */}
      {/*  <CoachInfo loading={loading} /> */}
      {/* </Panel> */}
      {/* <Panel key={4} header={header[3]} className={styles.panelP}> */}
      {/*  <TeamRoles loading={loading} /> */}
      {/* </Panel> */}
      {/* <Panel key={5} header={header[4]} className={styles.panelP}> */}
      {/*  <LicenseStatus /> */}
      {/* </Panel> */}
      {/* <Panel key={6} header={header[5]} className={styles.panelP}> */}
      {/*  <EmergencyContacts loading={loading} /> */}
      {/* </Panel> */}
      {/* <Panel key={7} header={header[6]} className={styles.panelP}> */}
      {/*  <HealthInformation loading={loading} /> */}
      {/* </Panel> */}
      {/* <Panel key={8} header={header[7]} className={styles.panelP}> */}
      {/*  <CoachReleases /> */}
      {/* </Panel> */}
      {/* <Panel key={9} header={header[8]} className={styles.panelP}> */}
      {/*  The code of conduct has been agree to. */}
      {/* </Panel> */}
      {/* <Panel key={10} header={header[9]} className={styles.panelP}> */}
      {/*  Do am he horrible distance marriage so although. Afraid assure */}
      {/*  square so happen mr an before. His many same been well can high that. */}
      {/* </Panel> */}
      {/* <Panel key={11} header={header[10]} className={styles.panelP}> */}
      {/*  You background check has been approved */}
      {/* </Panel> */}
      {/* <Panel key={12} header="Order history" className={styles.panelP}> */}
      {/*  <OrderHistory */}
      {/*    name={`${data?.coach?.profile?.firstName} ${data?.coach?.profile?.lastName}`} */}
      {/*    orders={data?.coach?.profile?.orders ?? []} */}
      {/*  /> */}
      {/* </Panel> */}
    </>
  );
};

export default Coach;
