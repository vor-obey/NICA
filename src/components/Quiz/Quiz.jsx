import React, {
  useEffect,
  useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Card, Carousel, Form, Button, Space, Typography, Steps,
} from 'antd';
import Question, { AnswerPropType } from './Question';

const { Title } = Typography;
const { Step } = Steps;

const Quiz = ({ quiz }) => {
  const [step, setStep] = useState(0);
  const { questions, description, title } = quiz;

  const carousel = useRef();

  useEffect(() => {
    carousel.current.goTo(step);
  }, [step]);

  return (
    <Form
      layout="vertical"
      onFinish={(values) => {
        console.group('SUBMIT');
        console.log(values);
        console.groupEnd();
      }}
    >
      <Card title={<Title level={2}>{title}</Title>}>
        <Form.Item>
          <Carousel
            afterChange={setStep}
            ref={carousel}
          >
            {
              questions.map((item, index, array) => (
                <div key={item.id} style={{ display: 'flex' }}>
                  <Question question={item} />
                </div>
              ))
            }
          </Carousel>
        </Form.Item>
        <Form.Item>
          <Steps size="small" current={step}>
            {
              questions.map((item, index, array) => (
                <Step
                  key={item.id}
                  onClick={() => setStep(index)}
                  title={`${index + 1}/${array.length}`}
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
                carousel.current.prev();
              }}
            >
              Prev Question
            </Button>
            <Button
              ghost
              type="primary"
              onClick={() => {
                carousel.current.next();
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

export const QuestPropType = PropTypes.shape({
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(AnswerPropType).isRequired,
});

Quiz.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(QuestPropType).isRequired,
  }).isRequired,
};

export default Quiz;
