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

const LicenseStatus = () => {
  const { data } = useQuery(COACH_LICENSE_QUERY, {
    variables: {
      coachId: 1,
    },
  });

  return (
    <Row className={styles.licensesRow}>
      {data?.license.map((card) => {
        const {
          progress, level, license, id, access, image,
        } = card;
        return (
          access
            ? (
              <Link to="/quiz">
                <LicenseCard
                  key={id}
                  progress={progress}
                  level={level}
                  license={license}
                  image={image}
                />
              </Link>
            )
            : (
              <LicenseCard
                key={id}
                progress={progress}
                level={level}
                license={license}
                image={image}
              />
            )
        );
      })}
    </Row>
  );
};

export default LicenseStatus;
