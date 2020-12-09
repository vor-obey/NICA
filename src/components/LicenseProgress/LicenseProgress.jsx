/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { SendOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {
  Steps, Row, Col, Divider,
} from 'antd';
import React, {
  useEffect,
  useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';

const LicenseProgressStep = () => (
  <>
  </>
);

const LicenseProgress = ({
  steps, currentStepIndex, children, layout,
}) => {
  const childrenArray = React.Children.toArray(children);
  const [stepIndex, setStepIndex] = useState(currentStepIndex || 0);

  useEffect(() => {
    if (currentStepIndex !== stepIndex) {
      setStepIndex(currentStepIndex);
    }
  }, [currentStepIndex]);

  const stepsProgress = useMemo(
    () => (steps.map(({ title, description, id }, index) => (
      <Steps.Step
        key={title}
        title={<Link to={`${index}`}>{title}</Link>}
        description={<Link to={`${index}`}>{description}</Link>}
      />
    ))),
    [steps, stepIndex],
  );

  return (
    <Row>
      <Col span={layout === 'vertical' ? 4 : 24}>
        <Steps
          status="process"
          current={stepIndex}
          direction={layout}
          onChange={(current) => setStepIndex(current)}
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
        {childrenArray[stepIndex]}
      </Col>
    </Row>
  );
};

export const StepPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
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
