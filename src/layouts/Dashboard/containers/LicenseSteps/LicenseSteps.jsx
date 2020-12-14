import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import LicenseProgress from '../../../../components/LicenseProgress';
import LicenseStepContainer from '../../components/LicenseStepContainer';
import useAuthQuery from '../../../../hooks/useAuthQuery';

export const LICENSE_STEPS_QUERY = gql`
    query licenseData($licenseId: ID!){
        steps(id: $licenseId) {
            id,
            title,
            description,
            type,
            data,
            quiz,
            status,
        },
    }`;

const LicenseSteps = () => {
  const { loading, data } = useAuthQuery(LICENSE_STEPS_QUERY, {
    variables: {
      licenseId: 1,
    },
  });

  const history = useHistory();
  const { licenseId, index } = useParams();

  const currentIndex = useMemo(() => parseInt(index, 10), [index]);

  useEffect(() => {
    history.push(`/licenses/${licenseId}/step/0`);
  }, []);

  const setCurrentStep = useCallback((nextStep) => {
    if (data?.steps && !data?.steps[nextStep]) return;

    history.push(`/licenses/${licenseId}/step/${nextStep}`);
  }, [history]);

  const goNext = useCallback(() => {
    setCurrentStep(currentIndex + 1);
  }, [setCurrentStep, currentIndex]);

  return (
    <LicenseProgress
      loading={loading}
      steps={data?.steps}
      setCurrentStep={setCurrentStep}
      currentStepIndex={currentIndex}
    >
      <LicenseStepContainer loading={loading} step={data?.steps[currentIndex]} goNext={goNext} />
    </LicenseProgress>
  );
};

export default LicenseSteps;
