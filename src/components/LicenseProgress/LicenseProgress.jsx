/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ProgressSteps from './ProgressSteps';

const LicenseProgress = ({
  steps, currentStepIndex, children, setCurrentStep,
}) => (
  <Row gutter={40}>
    <Col span={4}>
      <ProgressSteps
        steps={steps}
        onChange={setCurrentStep}
        current={currentStepIndex}
      />
    </Col>
    <Col span={20}>
      {children}
    </Col>
  </Row>
);

export const StepPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}).isRequired;

LicenseProgress.propTypes = {
  steps: PropTypes.arrayOf(StepPropType).isRequired,
  currentStepIndex: PropTypes.number,
};

LicenseProgress.defaultProps = {
  currentStepIndex: null,
};

export default LicenseProgress;
