import React, {
  useCallback, useEffect, useMemo, useReducer,
} from 'react';
import {
  Button, Typography, Row, Card, Col,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../LicenseConstructor/LicenseConstructor.module.scss';
import ACTIONS from './api/actions';
import initializer, { QUIZ_CONSTRUCTOR_KEY } from './api/initializer';
import quizConstructorReducer from './api/reducer';
import QuestionConstructor from './components/QuestionConstructor';
import QuizConstructorContext from './api/QuizConstructorContext';

const { Title } = Typography;

const QuizConstructor = ({ quiz, onSubmit }) => {
  const [state, dispatch] = useReducer(quizConstructorReducer, quiz, initializer);

  useEffect(() => {
    localStorage.setItem(QUIZ_CONSTRUCTOR_KEY, JSON.stringify(state));
  }, [state]);

  const onClickCreateBtnHandle = useCallback(() => {
    onSubmit(state);
    localStorage.removeItem(QUIZ_CONSTRUCTOR_KEY);
  }, [dispatch, state]);

  const onClickAddQuestionBtnHandler = useCallback(() => {
    dispatch({ type: ACTIONS.ADD_QUESTION });
  }, [dispatch]);

  const questionsConstructors = useMemo(() => (
    state.questions.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <QuestionConstructor index={index} key={item.id} />
    ))
  ), [state.questions]);

  return (
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
      <QuizConstructorContext.Provider value={[state, dispatch]}>
        {questionsConstructors}
      </QuizConstructorContext.Provider>
      <Col>
        <Button
          icon={<PlusOutlined />}
          type="dashed"
          style={{
            width: '100%',
            margin: '10px 0',
          }}
          size="large"
          onClick={onClickAddQuestionBtnHandler}
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
  );
};

export default QuizConstructor;
