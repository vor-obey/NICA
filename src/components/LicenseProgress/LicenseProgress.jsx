import PropTypes from 'prop-types';
import {
  Steps, Row, Col, Button, Empty,
} from 'antd';
import React, {
  useCallback, useEffect,
  useMemo, useState,
} from 'react';
import {
  useParams, useLocation, useHistory, Switch, Route,
} from 'react-router-dom';
import ProgressSteps from './ProgressSteps';
import Quiz, { QuizPropType } from '../Quiz';
import UploadFile from '../Upload/UploadFile';
import Player from '../Player/Player';

const normalizeId = (id) => {
  if (Number(id)) {
    return id;
  }
  return Number(id);
};

const createPathName = (pathname, id) => `${pathname.replace(/#.*?$/, '')}#${id}`;

export const STEP_TYPES = {
  VIDEO: 'VIDEO',
  UPLOAD: 'UPLOAD',
};

const stepsComponents = new Map()
  .set(STEP_TYPES.VIDEO, Player)
  .set(STEP_TYPES.UPLOAD, UploadFile);

const stepsReducer = (accumulator, { quiz, type, ...step }) => {
  const StepComponent = stepsComponents.get(type) ?? Empty;
  accumulator.push({
    component: () => <StepComponent {...step} />,
    ...step,
  });
  if (quiz) {
    accumulator.push({
      id: `${step.id}_quiz`,
      title: `${step.title}. Quiz.`,
      description: `${step.description}. Quiz.`,
      done: false,
      component: () => (
        <Quiz
          onSubmit={() => {
          }}
          quiz={quiz}
        />
      ),
    });
  }
  return accumulator;
};

const LicenseProgress = ({ steps: initialSteps }) => {
  const history = useHistory();
  const location = useLocation(); // DRAFT!
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // DRAFT!

  // reduce steps
  const steps = useMemo(
    () => initialSteps.reduce(stepsReducer, []),
    [initialSteps],
  );

  // onChange handler for antd Steps component
  const onChangeCurrentStepIndex = useCallback((current) => {
    setCurrentStepIndex(current);
  }, [setCurrentStepIndex]);

  const onContinue = useCallback(() => {
    setCurrentStepIndex((v) => (v < steps.length - 1 ? v + 1 : v));
  }, [steps]);

  const routes = useMemo(
    () => steps.map((step, index) => (
      <Route
        key={index.id}
        path={createPathName(location.pathname, step.id)}
        {...step}
      />
    )),
    [steps],
  );

  useEffect(() => {
    const result = {
      pathname: createPathName(location.pathname, steps[currentStepIndex].id),
    };
    history.push(result);
  }, [currentStepIndex]);

  return (
    <>
      <Row gutter={20}>
        <Col span={4}>
          <ProgressSteps
            steps={steps}
            onChange={onChangeCurrentStepIndex}
            current={currentStepIndex}
          />
        </Col>
        <Col span={20}>
          <Switch>
            {routes}
          </Switch>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={onContinue}>Continue</Button>
        </Col>
      </Row>
    </>
  );
};

export const StepPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  quiz: QuizPropType,
  type: PropTypes.oneOf([Object.values(STEP_TYPES)]).isRequired,
}).isRequired;

LicenseProgress.propTypes = {
  steps: PropTypes.arrayOf(StepPropType).isRequired,
};

export default LicenseProgress;
