/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import {
  Steps, Row, Col, Divider,
} from 'antd';
import React, { useMemo } from 'react';

const LicenseProgress = ({
  steps, currentStepIndex, children, layout, setCurrentStep,
}) => {
  const stepsProgress = useMemo(
    () => (steps.map(({ title, description, id }, index) => (
      <Steps.Step
        key={title}
        title={title}
        description={description}
      />
    ))),
    [steps, currentStepIndex],
  );

  return (
    <Row>
      <Col span={layout === 'vertical' ? 4 : 24}>
        <Steps
          status="process"
          current={currentStepIndex}
          direction={layout}
          onChange={setCurrentStep}
        >
          {stepsProgress}
          <Steps.Step
            icon={<SendOutlined />}
            title="Approve"
            description="Confirmation"
          />
        </Steps>
      </Col>
      <Col span={layout === 'vertical' ? 1 : 24}>
        <Divider type={layout} />
      </Col>
      <Col span={layout === 'vertical' ? 19 : 24}>
        {children}
      </Col>
    </Row>
  );
};

export const StepPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}).isRequired;

LicenseProgress.propTypes = {
  steps: PropTypes.arrayOf(StepPropType).isRequired,
  currentStepIndex: PropTypes.number,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
};

LicenseProgress.defaultProps = {
  currentStepIndex: null,
  layout: 'vertical',
};

export default LicenseProgress;
