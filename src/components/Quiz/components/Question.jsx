import React from 'react';
import {
  Card, Form, Radio, Space, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import Answer, { AnswerPropType } from './Answer';

const { Title } = Typography;

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

export const QuestPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(AnswerPropType).isRequired,
});

Question.propTypes = {
  question: QuestPropType.isRequired,
};

export default Question;
