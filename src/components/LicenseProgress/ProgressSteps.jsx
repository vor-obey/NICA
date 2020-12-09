import { Steps } from 'antd';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';

const ProgressSteps = ({
  steps, current, onChange, direction,
}) => {
  const stepsProgress = useMemo(
    () => (steps.map(({ title, description, id }) => (
      <Steps.Step
        key={title}
        title={<Link to={`${id}`}>{title}</Link>}
        description={<Link to={`${id}`}>{description}</Link>}
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
      <Steps.Step
        icon={<SendOutlined />}
        title="Approve"
        description="Confirmation"
      />
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
