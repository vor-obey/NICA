import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Row } from 'antd';
import { Link } from 'react-router-dom';
import LicenseCard from '../../../../components/LicenseCard/LicenseCard';
import styles from './Licenses.module.scss';

export const COACH_LICENSE_QUERY = gql`
    query dashboardLicenseCoach($coachId: ID!){
        license (id: $coachId) {
            id,
            license,
            level,
            progress,
            completed,
            access,
            image,
        }, 
    }`;

const CoachLicense = () => {
  const { data } = useQuery(COACH_LICENSE_QUERY, {
    variables: {
      coachId: 1,
    },
  });

  return (
    <Row className={styles.licensesRow}>
      {data?.license.map(({
        progress,
        level,
        license,
        id,
        image,
      }) => (
        <Link to="/licenses/0/step/0" key={id}>
          <LicenseCard
            key={id}
            progress={progress}
            level={level}
            license={license}
            image={image}
          />
        </Link>
      ))}
    </Row>
  );
};

export default CoachLicense;
