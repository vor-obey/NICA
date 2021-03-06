import React, {
  useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Card, Form, Button, Space, Typography, Steps,
} from 'antd';
import Question, { QuestPropType } from './components/Question';

const { Step } = Steps;
const { Title, Paragraph } = Typography;

const Quiz = ({
  quiz, onSubmit,
}) => {
  const [step, setStep] = useState(0);
  const { questions, description, title } = quiz;
  const [stepsStatuses, setStepStatuses] = useState(questions.reduce((acc, item) => ({
    ...acc,
    [item.id]: 'wait',
  }), {}));
  const carousel = useRef();

  return (
    <Form
      preserve
      layout="vertical"
      onFinishFailed={({ values }) => {
        setStepStatuses(Object.keys(values)
          .reduce((acc, item) => ({
            ...acc,
            [item]: values[item] ? acc[item] : 'error',
          }), stepsStatuses));
      }}
      onValuesChange={(changedValues, values) => {
        setStepStatuses(Object.keys(values)
          .reduce((acc, item) => ({
            ...acc,
            [item]: values[item] ? 'finish' : acc[item],
          }), stepsStatuses));
      }}
      onFinish={onSubmit}
    >
      <Card
        title={(
          <div>
            <Title level={2} ellipsis>{title}</Title>
            <Paragraph
              ellipsis
              type="secondary"
            >
              {description}
            </Paragraph>
          </div>
      )}
      >
        <Form.Item>
          <Question question={questions[step]} />
        </Form.Item>
        <Form.Item>
          <Steps
            size="default"
            current={step}
            direction="horizontal"
            onChange={(current) => {
              setStep(current);
            }}
          >
            {
              questions.map((item, index) => (
                <Step
                  key={item.id}
                  status={step === index ? 'process' : stepsStatuses[item.id]}
                  onClick={() => setStep(index)}
                />
              ))
            }
          </Steps>
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button
              ghost
              type="primary"
              onClick={() => {
                setStep((v) => (v - 1 + questions.length) % questions.length);
              }}
            >
              Prev Question
            </Button>
            <Button
              ghost
              type="primary"
              onClick={() => {
                setStep((v) => (v + 1) % questions.length);
              }}
            >
              Next Question
            </Button>
          </Space>
        </Form.Item>
        <Form.Item wrapperCol={{
          offset: 20,
          span: 4,
        }}
        >
          <Button block size="large" htmlType="submit" type="primary">Submit</Button>
        </Form.Item>
      </Card>
    </Form>
  );
};

export const QuizPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  questions: PropTypes.arrayOf(QuestPropType).isRequired,
});

Quiz.propTypes = {
  quiz: QuizPropType.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Quiz;
