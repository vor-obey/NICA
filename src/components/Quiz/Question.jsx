import React from 'react';
import {
  Card, Form, Radio, Button, Row, Col, Space, Typography,
} from 'antd';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const Answer = (props) => {
  const { answer: { id, text } } = props;
  return (
    <Radio
      name="answers"
      value={id}
    >
      {text}
    </Radio>
  );
};

const Question = ({
  question,
}) => {
  const { id: questionId, answers, question: questionText } = question;

  return (
    <Card>
      <Form.Item
        label={(<Title level={3}>{questionText}</Title>)}
        name={questionId}
        rules={[{
          required: true,
          message: `"${questionText}" is required`,
        }]}
      >
        <Radio.Group>
          <Space direction="vertical" size="large">
            {
              answers.map((answer) => (
                <Answer key={answer.id} answer={answer} />
              ))
            }
          </Space>
        </Radio.Group>
      </Form.Item>
    </Card>
  );
};

export const IdPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const AnswerPropType = PropTypes.shape({
  id: IdPropType.isRequired,
  text: PropTypes.string.isRequired,
});

Question.propTypes = {
  question: PropTypes.shape({
    id: IdPropType.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(AnswerPropType).isRequired,

  }).isRequired,
};

export default Question;
