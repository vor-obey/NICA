import React, {
  useCallback, useReducer,
} from 'react';
import {
  Button, Typography, Row, Card, Col,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../LicenseConstructor/LicenseConstructor.module.scss';
import ACTIONS from './api/actions';
import initializer from './api/initializer';
import quizConstructorReducer from './api/reducer';
import CreateQuestion from './components/CreateQuestion/CreateQuestion';
import QuizConstructorContext from './api/QuizConstructorContext';

const { Title } = Typography;

const defaultQuestion = {
  question: 'Your question...',
  answers: [
    {
      text: 'Answer 1',
      isCorrectAnswer: false,
    },
    {
      text: 'Answer 2',
      isCorrectAnswer: false,
    },
    {
      text: 'Answer 3',
      isCorrectAnswer: false,
    },
    {
      text: 'Answer 4',
      isCorrectAnswer: false,
    },
  ],
};

const QuizConstructor = ({ quiz, onSubmit }) => {
  const [state, dispatch] = useReducer(quizConstructorReducer, quiz, initializer);
  const { questions, ...quizInfo } = state;

  const onClickCreateBtnHandle = useCallback(() => {
    dispatch({
      type: ACTIONS.CREATE_QUIZ,
    });
    console.log(state);
  }, [dispatch, state]);

  const onClickAddQuestionHandler = useCallback(() => {
    dispatch({
      type: ACTIONS.ADD_QUESTION,
      payload: {
        defaultQuestion,
      },
    });
  }, [dispatch]);

  const renderQuestions = () => (
    state.questions.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <CreateQuestion index={index} key={`${index} ${item.question}`} item={item} />
    ))
  );

  return (
    <QuizConstructorContext.Provider value={[state, dispatch]}>
      <Card
        className={styles.cardWidget}
        title={(
          <Row justify="space-between">
            <Col>
              <Title level={2}>Quiz info</Title>
            </Col>
          </Row>
      )}
      >

        {renderQuestions()}

        <Col>
          <Button
            icon={<PlusOutlined />}
            type="dashed"
            style={{ width: '100%', margin: '10px 0' }}
            size="large"
            onClick={onClickAddQuestionHandler}
          >
            Add questions
          </Button>
        </Col>

        <Col>
          <Button
            type="primary"
            size="large"
            style={{ width: '100%' }}
            htmlType="submit"
            icon={<PlusOutlined />}
            onClick={onClickCreateBtnHandle}
          >
            Create Quiz
          </Button>
        </Col>
      </Card>
    </QuizConstructorContext.Provider>
  );
};

export default QuizConstructor;
