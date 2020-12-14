import { Steps } from 'antd';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { renderIconsResult } from '../../layouts/Dashboard/containers/LicenseStatus/LicenseStatus';

const ProgressSteps = ({
  steps, current, onChange, direction,
}) => {
  const stepsProgress = useMemo(
    () => (steps.map(({
      title, description, id, status,
    }) => (
      <Steps.Step
        icon={renderIconsResult[status]}
        key={title}
        title={title}
        description={description}
      />
    ))),
    [steps, current],
  );

  return (
    <Steps
      status="process"
      current={current}
      direction={direction}
      onChange={onChange}
    >
      {stepsProgress}
    </Steps>
  );
};

ProgressSteps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    },
  )).isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
};

ProgressSteps.defaultProps = {
  direction: 'vertical',
};

export default ProgressSteps;
