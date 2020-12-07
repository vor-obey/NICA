/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import {
  Carousel, Steps, Row, Col, Button, Typography, Divider,
} from 'antd';
import React, {
  useMemo, useRef, useState, Children, useCallback,
} from 'react';

const { Text } = Typography;

const LicenseProgressStep = () => (
  <>
  </>
);

const LicenseProgress = ({
  steps, currentStepIndex, children, layout,
}) => {
  const childrenArray = React.Children.toArray(children);
  const [stepIndex, setStepIndex] = useState(
    currentStepIndex ?? steps.findIndex((item) => !item.done),
  );
  const stepsProgress = useMemo(
    () => (steps.map(({ title, description }) => (
      <Steps.Step key={title} title={title} description={description} />))),
    [steps, stepIndex],
  );

  return (
    <Row>
      <Col span={layout === 'vertical' ? 4 : 24}>
        <Steps
          status="process"
          current={stepIndex}
          direction={layout}
          onChange={(current) => {
            if (steps[current]?.done || steps[current - 1]?.done) {
              setStepIndex(current);
            }
            setStepIndex((v) => v);
          }}
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
