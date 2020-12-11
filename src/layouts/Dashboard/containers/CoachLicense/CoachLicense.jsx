import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Card, Row, Typography, Skeleton,
} from 'antd';
import { Link } from 'react-router-dom';
import LicenseCard from '../../../../components/LicenseCard/LicenseCard';
import styles from './Licenses.module.scss';

const { Title } = Typography;

export const COACH_LICENSE_QUERY = gql`
    query dashboardLicenseCoach($coachId: ID!){
        license (id: $coachId) {
            id,
            name,
            level,
            step,
            progress,
            completed,
            access,
            image,
        }, 
    }`;

const CoachLicense = () => {
  const { data, loading } = useQuery(COACH_LICENSE_QUERY, {
    variables: {
      coachId: 1,
    },
  });

  return (
    <Card title={<Title>Licenses</Title>}>
      <Skeleton loading={loading}>
        <Row className={styles.licensesRow}>
          {data?.license.map(({
            progress,
            level,
            name,
            id,
            image,
            step,
          }) => (
            <Link to="/licenses/0/steps" key={id}>
              <LicenseCard
                key={id}
                progress={progress}
                level={level}
                name={name}
                image={image}
                step={step}
              />
            </Link>
          ))}
        </Row>
      </Skeleton>
    </Card>
  );
};

export default CoachLicense;
