import React, {
  useCallback, useContext, useState,
} from 'react';
import {
  Button, Form, Input, Col, Row, Card, Checkbox, Typography,
} from 'antd';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import ACTIONS from '../api/actions';
import QuizConstructorContext from '../api/QuizConstructorContext';
import EditableText from '../../EditableText';

const { Text } = Typography;

const QuestionConstructor = ({
  index: questionIndex,
}) => {
  const [state, dispatch] = useContext(QuizConstructorContext);
  const question = state.questions[questionIndex];
  const [questionValue, setQuestionValue] = useState(question.question);

  const onChangeInputHandle = useCallback(({ target }) => {
    setQuestionValue(target.value);
  }, [setQuestionValue]);

  const onClickAddAnswer = useCallback(() => {
    dispatch({
      type: ACTIONS.ADD_ANSWER,
      payload: {
        questionIndex,
      },
    });
  }, [dispatch, questionIndex]);

  const removeAnswer = useCallback((deleteIndex) => {
    dispatch({
      type: ACTIONS.REMOVE_ANSWER,
      payload: {
        questionIndex,
        deleteIndex,
      },
    });
  }, [dispatch, questionIndex]);

  const onClickDeleteQuestion = useCallback(() => {
    dispatch({
      type: ACTIONS.REMOVE_QUESTION,
      payload: { questionIndex },
    });
  }, [dispatch, questionIndex]);

  const onBlurAnswerChange = useCallback((value, index) => {
    dispatch({
      type: ACTIONS.ANSWER_INFO_CHANGE,
      payload: {
        questionIndex,
        value,
        index,
      },
    });
  }, [dispatch, questionIndex]);

  const onChangeCorrectAnswer = useCallback((value, index) => {
    dispatch({
      type: ACTIONS.SET_CORRECT_ANSWER,
      payload: {
        value,
        index,
        questionIndex,
      },
    });
  }, [dispatch, questionIndex]);

  const onChangeQuestion = useCallback((value) => {
    dispatch({
      type: ACTIONS.QUESTION_INFO_CHANGE,
      payload: {
        value,
        questionIndex,
      },
    });
  }, [dispatch, questionIndex]);

  return (
    <Form layout="vertical" initialValues={{ question: questionValue }}>
      <Card
        style={{ marginBottom: 20 }}
        actions={[
          <DeleteOutlined
            key="delete"
            style={{
              color: 'red',
              fontSize: 22,
            }}
            onClick={onClickDeleteQuestion}
          />,
        ]}
      >
        <Form.Item
          label={<Text strong>Question</Text>}
          name="question"
          fieldKey="question"
          rules={[{
            required: true,
            message: 'Missing text',
          }]}
        >
          <Input
            onBlur={(e) => onChangeQuestion(e.target.value)}
            size="large"
            onChange={onChangeInputHandle}
          />
        </Form.Item>

        {question.answers.map((answer, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Row align="center" key={answer.id}>
            <Col span={1} align="end">
              <Form.Item
                name={['isCorrect']}
                fieldKey={['isCorrect']}
              >
                <Checkbox
                  style={{ marginRight: 10 }}
                  checked={answer.isCorrect}
                  onChange={(e) => onChangeCorrectAnswer(e.target.checked, index)}
                />
              </Form.Item>
            </Col>

            <Col span={19}>
              <Form.Item
                name={['text']}
                fieldKey={['text']}
                rules={[{
                  required: true,
                  message: 'Missing text',
                }]}
              >
                <EditableText onBlur={(event) => onBlurAnswerChange(event.target.value, index)}>
                  {answer.text}
                </EditableText>
              </Form.Item>
            </Col>

            <Col span={4} align="end">
              <DeleteOutlined
                style={{
                  color: 'red',
                  fontSize: 22,
                }}
                onClick={() => removeAnswer(index)}
              />
            </Col>
          </Row>
        ))}

        <Button type="dashed" icon={<PlusOutlined />} onClick={onClickAddAnswer}>
          Add answer
        </Button>
        <Form.Item />
      </Card>
    </Form>
  );
};

export default QuestionConstructor;
